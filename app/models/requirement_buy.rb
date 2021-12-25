class RequirementBuy < ApplicationRecord
  validates :facility_name, presence: true
  validates :purchase_price, presence: true
  validates :free_time, presence: true
  validates :only_weekdays, inclusion: { in: [true, false] }

  belongs_to :parking
end
