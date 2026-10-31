# frozen_string_literal: true

module Types
  class TagType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :video_count, Int, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def video_count
      context[:video_titles] ||= Video.titles
      (object.tag_video_relations.pluck(:video_title) & context[:video_titles]).size
    end
  end
end
