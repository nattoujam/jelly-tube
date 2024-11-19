class UploadError < StandardError
    def initialize(message = 'アップロードに失敗しました', key = '', to = '')
        super("#{message}: #{key} to #{to}")
    end
end