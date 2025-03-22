module Mutations
  class CreateVideo < BaseMutation
    field :video, Types::VideoType, null: false

    argument :title, String, required: true
    argument :movie, ApolloUploadServer::Upload, required: true
    argument :thumbnail, ApolloUploadServer::Upload, required: true
    argument :tag_ids, [Int]

    def resolve(title:, movie:, thumbnail:, tag_ids:)
      Video.transaction {
        tags = Tag.find(tag_ids)
        video = Video.create!(title: title, tag_ids: tag_ids)

        VideoFile.transaction {
          video.create_video_file! unless video.video_file
          # ApolloUploadServer::Uploadをそのまま渡せないのでioとfilenameを渡す
          ext = File.extname(movie.original_filename)
          video.video_file.media.attach(key: "video/#{video.id}#{ext}", io: movie.to_io, filename: movie.original_filename)
          video.video_file
        }

        Thumbnail.transaction {
          video.create_thumbnail! unless video.thumbnail
          # ApolloUploadServer::Uploadをそのまま渡せないのでioとfilenameを渡す
          ext = File.extname(thumbnail.original_filename)
          video.thumbnail.image.attach(key: "thumbnail/#{video.id}#{ext}", io: thumbnail.to_io, filename: thumbnail.original_filename)
          video.thumbnail
        }

        { video: video }
      }
    end
  end
end
