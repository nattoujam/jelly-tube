# == Schema Information
#
# Table name: video_files
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  video_id   :bigint
#
# Indexes
#
#  index_video_files_on_video_id  (video_id)
#
class VideoFile < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :video
  has_one_attached :media

  after_commit :convert

  def convert
    M3u8ConverterJob.perform_later(self.video.id)
  end

  def name
    media.filename.to_s
  end

  def extension
    File.extname(name)
  end

  def path
    return '' unless media.attached?

    # url_for(media)
    ext = File.extname(name)
    return "#{Rails.configuration.s3_url}/video/#{video.id}#{ext}"
  end

  def m3u8_path
    return '' unless media.attached?

    return "#{Rails.configuration.s3_url.gsub(/#{Settings.dig(:minio, :video_bucket)}/, Settings.dig(:minio, :m3u8_bucket))}/#{video.id}/#{video.id}.m3u8"
  end

  def content_type
    return '' unless media.attached?

    media.content_type
  end
end
