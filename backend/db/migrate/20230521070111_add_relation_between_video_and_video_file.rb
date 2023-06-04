class AddRelationBetweenVideoAndVideoFile < ActiveRecord::Migration[7.0]
  def change
    change_table :video_files do |t|
      t.belongs_to :video
    end
  end
end
