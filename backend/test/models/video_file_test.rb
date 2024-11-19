# == Schema Information
#
# Table name: video_files
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  video_id   :integer
#
# Indexes
#
#  index_video_files_on_video_id  (video_id)
#
require "test_helper"

class VideoFileTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
