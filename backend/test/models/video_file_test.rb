# == Schema Information
#
# Table name: video_files
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  video_id   :bigint
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
