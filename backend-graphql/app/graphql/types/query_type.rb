module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :videos, [Types::VideoType], null: false,
      description: "Videoの一覧取得"
    field :videoFiles, [Types::VideoFileType], null: false,
      description: "VideoFileの一覧取得"

    def videos
      Video.all
    end
    def videoFiles
      VideoFile.all
    end
  end
end
