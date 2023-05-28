module Mutations
    class UploadVideoFile < BaseMutation
      argument :id, ID, required: true
      argument :movie, ApolloUploadServer::Upload, required: true
  
      type Types::VideoFileType
  
      def resolve(id:, movie:)
        video = Video.find id
        VideoFile.transaction do
          video.create_video_file! unless video.video_file
          # ApolloUploadServer::Uploadをそのまま渡せないのでioとfilenameを渡す
          video.video_file.media.attach(io: movie.to_io, filename: movie.original_filename)
          video.video_file
        end
      end
    end
  end