# File              : create_tag.rb
# Author            : nattoujam <public.kyuuanago@gmail.com>
# Date              : 2023 06/24
# Last Modified Date: 2023 06/24
# Last Modified By  : nattoujam <public.kyuuanago@gmail.com>

module Mutations
  class CreateTag < BaseMutation
    field :tag, Types::TagType, null: false

    argument :name, String, required: true

    def resolve(name:)
      Tag.transaction {
        tag = Tag.create!(name: name)

        { tag: tag }
      }
    end
  end
end
