module Mutations
  class DeleteTag < BaseMutation
    field :id, ID, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Tag.find(id).destroy
      { id: id }
    end
  end
end
