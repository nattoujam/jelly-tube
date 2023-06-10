class Video < ApplicationRecord
  has_one :video_file, dependent: :destroy
  has_one :thumnail, dependent: :destroy

  validates :title, presence: true
end
