require 'aws-sdk-s3'

Aws.config.update(
    region: 'us-east-1',
    credentials: Aws::Credentials.new(
        Rails.application.credentials.dig(:aws, :access_key_id),
        Rails.application.credentials.dig(:aws, :secret_access_key)
    ),
    force_path_style: true
)