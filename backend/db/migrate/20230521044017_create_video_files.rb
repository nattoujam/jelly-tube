class CreateVideoFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :video_files do |t|

      t.timestamps
    end
  end
end
