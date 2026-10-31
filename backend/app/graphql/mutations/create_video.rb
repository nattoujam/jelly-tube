module Mutations
  class CreateVideo < BaseMutation
    field :video, Types::VideoType, null: false

    argument :title, String, required: true
    argument :movie, ApolloUploadServer::Upload, required: true
    argument :thumbnail, ApolloUploadServer::Upload, required: true
    argument :tag_ids, [Int]

    def resolve(title:, movie:, thumbnail:, tag_ids:)
      video = Video.create!(title: title, source_file: movie, thumbnail_file: thumbnail, tags: Tag.find(tag_ids))
      M3u8ConverterJob.perform_later(video.title)

      { video: video }
    rescue Video::InvalidTitle => e
      raise GraphQL::ExecutionError.new(e.message, extensions: { code: Error::GraphqlError.codes[:invalid] })
    end
  end
end
