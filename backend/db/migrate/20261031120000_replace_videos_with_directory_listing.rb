class ReplaceVideosWithDirectoryListing < ActiveRecord::Migration[7.0]
  def up
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
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
