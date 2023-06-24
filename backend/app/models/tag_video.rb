# File              : tag_videos.rb
# Author            : nattoujam <public.kyuuanago@gmail.com>
# Date              : 2023 06/24
# Last Modified Date: 2023 06/24
# Last Modified By  : nattoujam <public.kyuuanago@gmail.com>

class TagVideo < ApplicationRecord
  belongs_to :video
  belongs_to :tag
end
