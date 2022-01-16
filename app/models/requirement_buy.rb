class RequirementBuy < ApplicationRecord
  validates :facility_name, presence: true
  validates :purchase_price, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :free_time, presence: true
  validates :only_weekdays, inclusion: { in: [true, false] }
  validate :free_time_check

  belongs_to :parking

  def free_time_check
    errors[:base] << "無料時間を入力してください" if free_time == "00:00"
  end
end
