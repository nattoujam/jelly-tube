# File              : video.rb
# Author            : nattoujam <public.kyuuanago@gmail.com>
# Date              : 2023 06/24
# Last Modified Date: 2023 06/24
# Last Modified By  : nattoujam <public.kyuuanago@gmail.com>

class Video < ApplicationRecord
  has_one :video_file, dependent: :destroy
  has_one :thumnail, dependent: :destroy
  has_many :tag_video_relations, dependent: :destroy
  has_many :tags, through: :tag_video_relations

  validates :title, presence: true
end
