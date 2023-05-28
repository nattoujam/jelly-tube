class Video < ApplicationRecord
  has_one :video_file, dependent: :destroy
  
  validates :title, presence: true
  validates :url, presence: true
end
