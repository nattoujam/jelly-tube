class Thumnail < ApplicationRecord
  belongs_to :video
  has_one_attached :image

  def name
    image.filename.to_s
  end

  def path
    return '' unless image.attached?

    Rails.application.routes.url_helpers.url_for(image)
  end

  def content_type
    return '' unless image.attached?

    image.content_type
  end
end