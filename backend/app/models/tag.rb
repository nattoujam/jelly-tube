# File              : tag.rb
# Author            : nattoujam <public.kyuuanago@gmail.com>
# Date              : 2023 06/24
# Last Modified Date: 2023 06/24
# Last Modified By  : nattoujam <public.kyuuanago@gmail.com>

class Tag < ApplicationRecord
  has_many :tag_videos
  has_many :videos, through: :tag_videos

  validates :name, uniqueness: true, presence: true
end
