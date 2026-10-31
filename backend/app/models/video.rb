require 'fileutils'
require 'tempfile'

class Video
  class NotFound < StandardError; end
  class InvalidTitle < StandardError; end

  HLS_DIR = 'hls'.freeze
  PLAYLIST_NAME = 'index.m3u8'.freeze
  UPLOAD_DIR = '.upload'.freeze

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

      root.children.select(&:directory?).map { |dir| dir.basename.to_s }.select { |title| valid_title?(title) }.sort
    end

    # title をそのままディレクトリ名に使うため、root の外や root 直下の作業用ディレクトリを指す title を受け付けないようにしている
    def valid_title?(title)
      title.present? && !title.include?('/') && !title.start_with?('.')
    end

    # 受け取った動画を rename で root の下へ移せるように、root と同じ filesystem に作る
    def upload_tempfile
      FileUtils.mkdir_p(root.join(UPLOAD_DIR))
      Tempfile.new('upload', root.join(UPLOAD_DIR))
    end

    def create!(title:, source_file:, thumbnail_file:, tags:)
      raise InvalidTitle, "invalid title: #{title}" unless valid_title?(title)
      raise InvalidTitle, "already exists: #{title}" if root.join(title).exist?

      dir = root.join(title)
      TagVideoRelation.transaction do
        tags.each { |tag| TagVideoRelation.create!(tag: tag, video_title: title) }

        FileUtils.mkdir_p(dir)
        { 'source' => source_file, 'thumbnail' => thumbnail_file }.each do |basename, file|
          path = dir.join("#{basename}#{File.extname(file.original_filename)}")
          FileUtils.mv(file.path, path)
          # Tempfile は所有者だけが読める権限で作られるため、umask どおりの権限に直す
          File.chmod(0o666 & ~File.umask, path)
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

  # プレイリストの有無で配信できるかを判定しているため、ブロックには別のディレクトリを渡し、書き終えてから hls に rename する
  def store_hls!
    hls_dir = dir.join(HLS_DIR)
    work_dir = dir.join(".#{HLS_DIR}")
    FileUtils.rm_rf(work_dir)
    FileUtils.mkdir(work_dir)

    yield work_dir.to_s

    FileUtils.rm_rf(hls_dir)
    File.rename(work_dir, hls_dir)
  ensure
    FileUtils.rm_rf(work_dir)
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
