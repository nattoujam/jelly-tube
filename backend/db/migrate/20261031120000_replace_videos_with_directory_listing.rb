require 'fileutils'
require 'net/http'

class ReplaceVideosWithDirectoryListing < ActiveRecord::Migration[7.0]
  OLD_VIDEO_BUCKET = 'develop.static.jelly-fish.local'.freeze
  OLD_M3U8_BUCKET = 'develop.static.m3u8.local'.freeze

  class TagVideoRelation < ActiveRecord::Base
    self.table_name = 'tag_video_relations'
  end

  def up
    videos = select_all('SELECT id, title, can_streaming FROM videos').to_a
    titles = titles_by_id(videos)
    tag_ids_by_video_id = select_all('SELECT tag_id, video_id FROM tag_video_relations').to_a
                          .group_by { |row| row['video_id'] }
                          .transform_values { |rows| rows.map { |row| row['tag_id'] }.uniq }
    blob_keys = select_values('SELECT `key` FROM active_storage_blobs')

    # drop の後で取り出しが失敗すると title とタグを読み直せなくなるため、drop より先に取り出す
    videos.each do |video|
      download_video(video['id'], titles[video['id']], blob_keys, ActiveModel::Type::Boolean.new.cast(video['can_streaming']))
    end

    drop_table :tag_video_relations
    drop_table :thumbnails
    drop_table :video_files
    drop_table :videos
    drop_table :active_storage_variant_records
    drop_table :active_storage_attachments
    drop_table :active_storage_blobs

    # ディレクトリ名は大文字小文字を区別し、絵文字などの4バイト文字も入るため
    create_table :tag_video_relations, charset: 'utf8mb4', collation: 'utf8mb4_bin' do |t|
      t.references :tag, null: false, foreign_key: true
      t.string :video_title, null: false

      t.timestamps
    end
    add_index :tag_video_relations, [:video_title, :tag_id], unique: true

    TagVideoRelation.reset_column_information
    tag_ids_by_video_id.each do |video_id, tag_ids|
      tag_ids.each { |tag_id| TagVideoRelation.create!(tag_id: tag_id, video_title: titles.fetch(video_id)) }
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

  private

  def titles_by_id(videos)
    used = Set.new
    videos.to_h do |video|
      title = video['title'].to_s.strip
      title = video['id'].to_s unless Video.valid_title?(title)
      title = "#{title} (#{video['id']})" if used.include?(title)
      used << title
      say "#{video['id']} -> #{title}"
      [video['id'], title]
    end
  end

  def download_video(id, title, blob_keys, can_streaming)
    dir = Video.root.join(title)
    FileUtils.mkdir_p(dir)

    { 'video' => 'source', 'thumbnail' => 'thumbnail' }.each do |old_dir, basename|
      blob_keys.grep(%r{\A#{old_dir}/#{id}\.}).each do |key|
        download("#{OLD_VIDEO_BUCKET}/#{key}", dir.join("#{basename}#{File.extname(key)}"))
      end
    end

    return unless can_streaming

    hls_dir = dir.join(Video::HLS_DIR)
    FileUtils.mkdir_p(hls_dir)
    playlist = get("#{OLD_M3U8_BUCKET}/#{id}/#{id}.m3u8").body
    playlist.lines.map(&:strip).reject { |line| line.empty? || line.start_with?('#') }.each do |segment|
      download("#{OLD_M3U8_BUCKET}/#{id}/#{segment}", hls_dir.join(segment))
    end
    File.write(hls_dir.join(Video::PLAYLIST_NAME), playlist)
  end

  def download(path, destination)
    say "#{path} -> #{destination.relative_path_from(Rails.root)}", true
    get(path) { |response| File.open(destination, 'wb') { |file| response.read_body { |chunk| file.write(chunk) } } }
  end

  # 取り出し元の bucket は anonymous で読めるため、署名なしの GET で取り出す
  def get(path, &block)
    uri = URI("#{ENV.fetch('OLD_MINIO_ENDPOINT')}/#{path}")
    Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request_get(uri) do |response|
        response.value
        block&.call(response)
      end
    end
  end
end
