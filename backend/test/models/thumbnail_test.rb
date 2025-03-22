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
require "test_helper"

class ThumbnailTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
