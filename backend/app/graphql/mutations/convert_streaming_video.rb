module Mutations
    class ConvertStreamingVideo < BaseMutation
        field :id, ID, null: false

        argument :video_id, ID, required: true

        def resolve(video_id:)
            M3u8ConverterJob.perform_later(video_id)

            { id: video_id }
        end
    end
end