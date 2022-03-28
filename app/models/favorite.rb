class Favorite < ApplicationRecord
  validates :parking_id, presence: true
  validates :user_id, presence: true
  validates_uniqueness_of :parking_id, scope: :user_id

  belongs_to :parking
  belongs_to :user
end
