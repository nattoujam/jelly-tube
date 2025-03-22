class CreateThumnails < ActiveRecord::Migration[7.0]
  def change
    create_table :thumbnails do |t|
      t.belongs_to :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
