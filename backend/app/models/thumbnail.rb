# == Schema Information
#
# Table name: thumbnails
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  video_id   :bigint           not null
#
# Indexes
#
#  index_thumbnails_on_video_id  (video_id)
#
# Foreign Keys
#
#  fk_rails_...  (video_id => videos.id)
#
class Thumbnail < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :video
  has_one_attached :image

  def name
    image.filename.to_s
  end

  def path
    return '' unless image.attached?

    # url_for(image)
    ext = File.extname(name)
    return "#{Rails.configuration.s3_url}/thumbnail/#{video.id}#{ext}"
  end

  def content_type
    return '' unless image.attached?

    image.content_type
  end
end
