# == Schema Information
#
# Table name: videos
#
#  id            :integer          not null, primary key
#  can_streaming :boolean          default(FALSE), not null
#  title         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Video < ApplicationRecord
  has_one :video_file, dependent: :destroy
  has_one :thumbnail, dependent: :destroy
  has_many :tag_video_relations
  has_many :tags, through: :tag_video_relations, dependent: :destroy

  validates :title, presence: true
end
