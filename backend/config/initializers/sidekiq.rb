redis_url = Settings.dig(:redis, :convert_video, :url)

Sidekiq.configure_server do |config|
    config.redis = { url: redis_url }
    config.queues = [
        'convert_video'
    ]
    config.concurrency = 1

    config.error_handlers << proc { |ex, ctx_hash| Rails.logger.error("Sidekiq worker error: #{ex} #{ctx_hash}")}
end

Sidekiq.configure_client do |config|
    config.redis = { url: redis_url }
end
