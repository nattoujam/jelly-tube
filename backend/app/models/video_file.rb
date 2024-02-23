class VideoFile < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :video
  has_one_attached :media

  def name
    media.filename.to_s
  end

  def path
    return '' unless media.attached?

    # url_for(media)
    ext = File.extname(name)
    return "#{Rails.configuration.s3_url}/video/#{video.id}#{ext}"
  end

  def content_type
    return '' unless media.attached?

    media.content_type
  end
end
