class Parking < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validate :time_lag_check
  after_validation :remove_error_messages

  has_many :requirement_buys, dependent: :destroy
  has_many :requirement_facilities, dependent: :destroy
  has_many :requirement_frees, dependent: :destroy
  has_many :requirement_times, dependent: :destroy

  def time_lag_check
    if beginning_of_worktime.blank? || end_of_worktime.blank?
      errors[:base] << "営業時間を入力してください"
    elsif beginning_of_worktime > end_of_worktime
      errors[:base] << "終了時間は開始時間よりも後にしてください"
    end
  end

  def remove_error_messages
    errors.messages.delete(:latitude)
    errors.messages.delete(:longitude)
  end
end
