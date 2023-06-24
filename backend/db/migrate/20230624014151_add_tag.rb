class AddTag < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :name, null: false, unique: true

      t.timestamps
    end

    create_table :tag_videos do |t|
      t.references :tag, foreign_key: true
      t.references :video, foreign_key: true
      t.timestamps
    end

    add_reference :tags, :tag_video, foreign_key: true
    add_reference :tags, :video, foreign_key: true
    add_reference :videos, :tag_video, foreign_key: true
    add_reference :videos, :tag, foreign_key: true
  end
end
