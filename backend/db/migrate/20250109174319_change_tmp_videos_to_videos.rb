class ChangeTmpVideosToVideos < ActiveRecord::Migration[7.0]
  def change
    rename_table :tmp_videos, :videos
  end
end
