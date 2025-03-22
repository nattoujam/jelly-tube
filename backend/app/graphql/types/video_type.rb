# frozen_string_literal: true

module Types
  class VideoType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :can_streaming, Boolean, null: false
    field :video_file, VideoFileType, null: false
    field :thumbnail, ThumbnailType, null: false
    field :tags, [Types::TagType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
