class ChangeVideosToTmpVideos < ActiveRecord::Migration[7.0]
  def change
    rename_table :Videos, :tmp_videos
  end
end
