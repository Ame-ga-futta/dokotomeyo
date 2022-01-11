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
    end
  end

  def remove_error_messages
    errors.messages.delete(:latitude)
    errors.messages.delete(:longitude)
    errors.messages.delete(:requirement_buys)
    errors.messages.delete(:requirement_facilities)
    errors.messages.delete(:requirement_frees)
    errors.messages.delete(:requirement_times)
  end

  scope :search_in_bounds, -> (south_end, north_end, west_end, east_end) do
    where(
      "latitude > ? and latitude < ? and longitude > ? and longitude < ?",
      south_end, north_end, west_end, east_end
    )
  end

  scope :search_in_worktime, -> (start_time, end_time) do
    if start_time < end_time
      where(
        "beginning_of_worktime <= ? and end_of_worktime > ?",
        start_time, end_time
      )
    else
      where(
        "beginning_of_worktime <= ? and end_of_worktime >= ?",
        start_time, end_time
      ).where(
        "beginning_of_worktime > end_of_worktime or (beginning_of_worktime = ? and  end_of_worktime = ?)",
        "00:00", "23:59"
      )
    end
  end
end
