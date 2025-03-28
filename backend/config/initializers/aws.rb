require 'aws-sdk-s3'

Aws.config.update(
    region: 'us-east-1',
    credentials: Aws::Credentials.new(
        ENV['AWS_ACCESS_KEY_ID'],
        ENV['AWS_SECRET_ACCESS_KEY']
    ),
    force_path_style: true
)