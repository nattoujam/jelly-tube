class M3u8ConverterJob < ApplicationJob
    queue_as :convert_video

    def perform(video_id)
        abort_flag = false

        output_dir = convert(video_id)
        bucket_name = Settings.dig(:minio, 'm3u8_bucket')

        Dir.open(output_dir).each_child do |file|
            next if abort_flag

            source_path = "#{output_dir}/#{file}"
            key = "#{video_id}/#{File.basename(source_path)}"

            begin
                S3Uploader.new(bucket_name).upload!(source_path, key)
            rescue UploadError => e
                Rails.logger.error(e.message)
                abort_flag = true
            end
        end

        to_ready_streaming(video_id) unless abort_flag

        FileUtils.rm_r(output_dir)
    end

    private

    def convert(video_id, hls_time=9)
        video = Video.find(video_id)
        endpoint = Settings.dig(:minio, 'endpoint')
        bucket_name = Settings.dig(:minio, 'video_bucket')

        source_url = "#{endpoint}/#{bucket_name}/video/#{video_id}#{video.video_file.extension}"
        output_dir = "./tmp/#{video_id}"

        Dir.mkdir(output_dir)

        system("ffmpeg -i #{source_url} \
                       -c:v copy \
                       -c:a copy \
                       -f hls \
                       -hls_time #{hls_time} \
                       -hls_playlist_type vod \
                       #{output_dir}/#{video_id}.m3u8")

        output_dir
    end

    def to_ready_streaming(video_id)
        Video.find(video_id).update(can_streaming: true)
    end
end
