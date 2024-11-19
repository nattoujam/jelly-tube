class S3Uploader
    def initialize(bucket_name)
        @s3_client = Aws::S3::Client.new(endpoint: Settings.dig(:minio, 'endpoint'))
        @bucket_name = bucket_name
    end

    def upload!(source_path, target_key)
        begin
            @s3_client.put_object(
                bucket: @bucket_name,
                key: target_key,
                body: File.open(source_path)
            )
        rescue Aws::S3::Errors::ServiceError => e
            Rails.logger.error(e.message)
            raise UploadError.new(target_key, @bucket_name)
        end
    end
end
