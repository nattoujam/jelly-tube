class DeleteUrlColumnInVideos < ActiveRecord::Migration[7.0]
  def change
    remove_column :Videos, :url
  end
end
