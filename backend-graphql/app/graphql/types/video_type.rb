# frozen_string_literal: true

module Types
  class VideoType < Types::BaseObject
    field :id, ID, null: false
    field :title, String
    field :video_file, VideoFileType
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
