# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
  has_many :tag_video_relations, dependent: :destroy
  has_many :videos, through: :tag_video_relations

  validates :name, uniqueness: true
end
