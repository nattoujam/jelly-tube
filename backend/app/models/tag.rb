class Tag < ApplicationRecord
  has_many :tag_video_relations, dependent: :destroy
  has_many :videos, through: :tag_video_relations
end
