module Mutations
  class CreateVideo < BaseMutation
    field :video, Types::VideoType, null: false

    argument :title, String, required: true
    argument :url, String, required: true

    def resolve(**args)
      { video: Video.create!(**args) }
    end
  end
end
