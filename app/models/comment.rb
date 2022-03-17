class Comment < ApplicationRecord
  validates :parking_id, presence: true
  validates :user_id, presence: true
  validates :comment, presence: true, length: { maximum: 140 }

  belongs_to :parking
  belongs_to :user
end
