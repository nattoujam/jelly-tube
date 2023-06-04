class Video < ApplicationRecord
  has_one :video_file, dependent: :destroy
  
  validates :title, presence: true
end
