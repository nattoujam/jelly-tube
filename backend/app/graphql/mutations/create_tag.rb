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
      tag = Tag.new(name: name)

      if tag.valid?
        Tag.transaction {
          tag.save!

          { tag: tag }
        }
      else
        raise GraphQL::ExecutionError.new("invalid tag: #{tag.name}", extensions: { code: Error::GraphqlError.codes[:invalid] })
      end
    end
  end
end
