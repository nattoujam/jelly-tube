# frozen_string_literal: true

module Types
  class ThumnailType < Types::BaseObject
    field :id, ID, null: false
    field :video_id, ID, null: false
    field :name, String, null: false
    field :path, String, null: false
    field :content_type, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
