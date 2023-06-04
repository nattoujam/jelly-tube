module Mutations
  class UpdateVideo < BaseMutation
    field :video, Types::VideoType, null: false

    argument :id, ID, required: true
    argument :title, String, required: true
    argument :url, String, required: true

    def resolve(id:, title:, url:)
      video = Video.find(id)
      video.update!({ title: title, url: url })
      { video: video }
    end
  end
end
