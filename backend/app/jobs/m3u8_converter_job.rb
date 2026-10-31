class M3u8ConverterJob < ApplicationJob
    queue_as :convert_video

    def perform(title, hls_time = 9)
        video = Video.find(title)

        video.store_hls! do |dir|
            system('ffmpeg', '-i', video.source_path,
                   '-c:v', 'copy',
                   '-c:a', 'copy',
                   '-f', 'hls',
                   '-hls_time', hls_time.to_s,
                   '-hls_playlist_type', 'vod',
                   File.join(dir, Video::PLAYLIST_NAME),
                   exception: true)
        end
    end
end
