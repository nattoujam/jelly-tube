# == Schema Information
#
# Table name: tag_video_relations
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tag_id     :integer          not null
#  video_id   :integer          not null
#
# Indexes
#
#  index_tag_video_relations_on_tag_id    (tag_id)
#  index_tag_video_relations_on_video_id  (video_id)
#
# Foreign Keys
#
#  tag_id    (tag_id => tags.id)
#  video_id  (video_id => videos.id)
#
require "test_helper"

class TagVideoRelationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
