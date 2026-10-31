# frozen_string_literal: true

module Types
  class VideoType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :can_streaming, Boolean, null: false
    field :video_path, String, null: true
    field :m3u8_path, String, null: false
    field :thumbnail_path, String, null: true
    field :content_type, String, null: true
    field :tags, [Types::TagType], null: true
  end
end
