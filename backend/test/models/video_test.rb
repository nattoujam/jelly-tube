# == Schema Information
#
# Table name: videos
#
#  id            :integer          not null, primary key
#  can_streaming :boolean          default(FALSE), not null
#  title         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require "test_helper"

class VideoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
