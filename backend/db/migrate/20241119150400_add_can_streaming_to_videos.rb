class AddCanStreamingToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :can_streaming, :boolean, default: false, null: false
  end
end
