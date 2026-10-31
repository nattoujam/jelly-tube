# == Schema Information
#
# Table name: tag_video_relations
#
#  id          :bigint           not null, primary key
#  video_title :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  tag_id      :bigint           not null
#
# Indexes
#
#  index_tag_video_relations_on_tag_id                  (tag_id)
#  index_tag_video_relations_on_video_title_and_tag_id  (video_title,tag_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (tag_id => tags.id)
#
class TagVideoRelation < ApplicationRecord
  belongs_to :tag
end
