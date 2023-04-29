module Mutations
  class DeleteVideo < BaseMutation
    field :id, ID, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Video.find(id).delete
      { id: id }
    end
  end
end
