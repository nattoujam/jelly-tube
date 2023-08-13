class CreateTagVideoRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :tag_video_relations do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
