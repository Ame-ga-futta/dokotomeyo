class Parking < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validate :time_lag_check

  def time_lag_check
    if beginning_of_worktime.blank? || end_of_worktime.blank?
      errors[:base] << "営業時間を入力してください"
    elsif beginning_of_worktime > end_of_worktime
      errors[:base] << "終了時間は開始時間よりも後にしてください"
    end
  end
end
