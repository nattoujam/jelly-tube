module Types
  class MutationType < Types::BaseObject
    field :createVideo, mutation: Mutations::CreateVideo,
      description: "新しいVideoを追加"
    field :updateVideo, mutation: Mutations::UpdateVideo,
      description: "指定したVideoを編集"
    field :deleteVideo, mutation: Mutations::DeleteVideo,
      description: "指定したVideoを削除"
    field :convertStreamingVideo, mutation: Mutations::ConvertStreamingVideo,
      description: "VideoをStreaming用の形式へ変換"

    field :createTag, mutation: Mutations::CreateTag,
      description: "新しいTagを追加"
    field :deleteTag, mutation: Mutations::DeleteTag,
      description: "指定したTagを削除"
  end
end
