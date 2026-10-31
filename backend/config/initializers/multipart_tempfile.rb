class VideoUploadTempfile
  def initialize(app)
    @app = app
  end

  def call(env)
    env[Rack::RACK_MULTIPART_TEMPFILE_FACTORY] = ->(_filename, _content_type) { Video.upload_tempfile }
    @app.call(env)
  end
end

# ApolloUploadServer::Middleware が multipart を解析するより前に factory を入れる必要があるため、先頭に置く
Rails.application.config.middleware.insert_before 0, VideoUploadTempfile
# api_only では Rack::TempfileReaper が入らず、保存しなかった一時ファイルが GC まで Video.root に残るため
Rails.application.config.middleware.insert_before 0, Rack::TempfileReaper
