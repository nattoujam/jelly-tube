# == Schema Information
#
# Table name: thumnails
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  video_id   :integer          not null
#
# Indexes
#
#  index_thumnails_on_video_id  (video_id)
#
# Foreign Keys
#
#  video_id  (video_id => videos.id)
#
require "test_helper"

class ThumnailTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
