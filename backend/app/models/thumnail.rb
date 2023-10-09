class Thumnail < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :video
  has_one_attached :image

  def name
    image.filename.to_s
  end

  def path
    return '' unless image.attached?

    # url_for(image)
    return "#{Rails.configuration.s3_url}/thumnail/#{video.id}"
  end

  def content_type
    return '' unless image.attached?

    image.content_type
  end
end
