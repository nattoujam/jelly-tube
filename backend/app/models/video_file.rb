# == Schema Information
#
# Table name: video_files
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  video_id   :integer
#
# Indexes
#
#  index_video_files_on_video_id  (video_id)
#
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

  def m3u8_path
    return '' unless media.attached?

    return "#{Rails.configuration.s3_url.gsub(/#{ENV['S3_BUCKET_NAME']}/, ENV['S3_BUCKET_NAME_M3U8'])}/#{video.id}/#{video.id}.m3u8"
  end

  def content_type
    return '' unless media.attached?

    media.content_type
  end
end
