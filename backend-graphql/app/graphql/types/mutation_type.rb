module Types
  class MutationType < Types::BaseObject
    field :createVideo, mutation: Mutations::CreateVideo,
      description: "新しいVideoを追加"
    field :updateVideo, mutation: Mutations::UpdateVideo,
      description: "指定したVideoを編集"
    field :deleteVideo, mutation: Mutations::DeleteVideo,
      description: "指定したVideoを削除"
  end
end
