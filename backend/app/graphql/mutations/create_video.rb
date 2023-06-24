module Mutations
  class CreateVideo < BaseMutation
    field :video, Types::VideoType, null: false

    argument :title, String, required: true
    argument :movie, ApolloUploadServer::Upload, required: true
    argument :thumnail, ApolloUploadServer::Upload, required: true
    argument :tag_ids, [Int]

    def resolve(title:, movie:, thumnail:, tag_ids:)
      Video.transaction {
        tags = Tag.find(tag_ids)
        video = Video.create!(title: title, tags: tags)

        VideoFile.transaction {
          video.create_video_file! unless video.video_file
          # ApolloUploadServer::Uploadをそのまま渡せないのでioとfilenameを渡す
          video.video_file.media.attach(io: movie.to_io, filename: movie.original_filename)
          video.video_file
        }

        Thumnail.transaction {
          video.create_thumnail! unless video.thumnail
          # ApolloUploadServer::Uploadをそのまま渡せないのでioとfilenameを渡す
          video.thumnail.image.attach(io: thumnail.to_io, filename: thumnail.original_filename)
          video.thumnail
        }

        { video: video }
      }
    end
  end
end
