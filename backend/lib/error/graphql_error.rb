module Error
  class GraphqlError
    class << self
      def codes
        {
          invalid: 'INVALID',
        }
      end
    end
  end
end
