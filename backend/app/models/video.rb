require 'fileutils'

class Video
  class NotFound < StandardError; end
  class InvalidTitle < StandardError; end

  HLS_DIR = 'hls'.freeze
  PLAYLIST_NAME = 'index.m3u8'.freeze

  attr_reader :title

  class << self
    def root
      Rails.public_path.join('videos')
    end

    def all
      titles.map { |title| new(title) }
    end

    def find(title)
      raise NotFound, "video not found: #{title}" unless valid_title?(title) && root.join(title).directory?

      new(title)
    end

    def titles
      return [] unless root.directory?

      root.children.select(&:directory?).map { |dir| dir.basename.to_s }.sort
    end

    # title をそのままディレクトリ名に使うため、root の外を指す title を受け付けないようにしている
    def valid_title?(title)
      title.present? && !title.include?('/') && !%w[. ..].include?(title)
    end

    def create!(title:, source_file:, thumbnail_file:, tags:)
      raise InvalidTitle, "invalid title: #{title}" unless valid_title?(title)
      raise InvalidTitle, "already exists: #{title}" if root.join(title).exist?

      dir = root.join(title)
      TagVideoRelation.transaction do
        tags.each { |tag| TagVideoRelation.create!(tag: tag, video_title: title) }

        FileUtils.mkdir_p(dir)
        { 'source' => source_file, 'thumbnail' => thumbnail_file }.each do |basename, file|
          IO.copy_stream(file.to_io, dir.join("#{basename}#{File.extname(file.original_filename)}"))
        end
      rescue StandardError
        FileUtils.rm_rf(dir)
        raise
      end

      new(title)
    end
  end

  def initialize(title)
    @title = title
  end

  def id
    title
  end

  def can_streaming
    dir.join(HLS_DIR, PLAYLIST_NAME).file?
  end

  def tags
    Tag.joins(:tag_video_relations).where(tag_video_relations: { video_title: title })
  end

  def video_path
    source && public_path(source.basename.to_s)
  end

  def m3u8_path
    public_path(HLS_DIR, PLAYLIST_NAME)
  end

  def thumbnail_path
    thumbnail && public_path(thumbnail.basename.to_s)
  end

  def content_type
    source && Rack::Mime.mime_type(source.extname)
  end

  def source_path
    source&.to_s
  end

  def store_hls!(source_dir)
    hls_dir = dir.join(HLS_DIR)
    FileUtils.mkdir_p(hls_dir)
    segments = Dir.children(source_dir) - [PLAYLIST_NAME]

    # プレイリストの有無で配信できるかを判定しているため、セグメントを全て置いてから最後に置く
    (segments + [PLAYLIST_NAME]).each { |name| FileUtils.cp(File.join(source_dir, name), hls_dir) }
  end

  def destroy
    FileUtils.rm_rf(dir)
    TagVideoRelation.where(video_title: title).delete_all
  end

  private

  def dir
    self.class.root.join(title)
  end

  def source
    file_starting_with('source.')
  end

  def thumbnail
    file_starting_with('thumbnail.')
  end

  def file_starting_with(prefix)
    dir.children.find { |path| path.file? && path.basename.to_s.start_with?(prefix) }
  end

  def public_path(*names)
    segments = [self.class.root.relative_path_from(Rails.public_path).to_s, title, *names]
    "/#{segments.map { |segment| ERB::Util.url_encode(segment) }.join('/')}"
  end
end
