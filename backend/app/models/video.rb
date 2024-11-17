class Video < ApplicationRecord
  has_one :video_file, dependent: :destroy
  has_one :thumnail, dependent: :destroy
  has_many :tag_video_relations
  has_many :tags, through: :tag_video_relations, dependent: :destroy

  validates :title, presence: true
end
