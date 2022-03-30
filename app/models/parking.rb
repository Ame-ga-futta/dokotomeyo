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
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy

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

  def return_requirement(requirement_type, requirement)
    case requirement_type
    when "free" then
      requirement_frees.new(requirement.reject { |k, v| v == "" })
    when "time" then
      requirement_times.new(requirement.reject { |k, v| v == "" })
    when "buy" then
      requirement_buys.new(requirement.reject { |k, v| v == "" })
    when "facility" then
      requirement_facilities.new(requirement.reject { |k, v| v == "" })
    end
  end

  def requirement_count
    requirement_frees.size + requirement_times.size + requirement_buys.size + requirement_facilities.size
  end

  def return_error_message(edit_params, requirement_count)
    error_message = []
    requirement_count = requirement_count
    delete_count = 0

    error_message.push(errors.full_messages) unless valid?

    edit_params[:requirement_free].each do |key, requirement|
      requirement_free = requirement_frees.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      elsif requirement[:change]
        requirement[:requirements][:only_weekdays] = !(requirement[:requirements][:only_weekdays])
      else
        unless requirement_free.valid?
          error_message.push(requirement_free.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_time].each do |key, requirement|
      requirement_time = requirement_times.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_time.valid?
          error_message.push(requirement_time.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_buy].each do |key, requirement|
      requirement_buy = requirement_buys.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_buy.valid?
          error_message.push(requirement_buy.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_facility].each do |key, requirement|
      requirement_facility = requirement_facilities.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_facility.valid?
          error_message.push(requirement_facility.errors.full_messages)
        end
      end
    end

    if requirement_count <= delete_count
      error_message.push("無料の条件は一つ以上必要です")
    end

    error_message
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

  scope :includes_requirement, -> (requirements) { includes(requirements) }

  scope :search_requirement_buys, -> (weekday, time_limit) do
    where(
      "requirement_buys.#{weekday ? "id IS NOT NULL" : "only_weekdays = false"} and
      requirement_buys.free_time >= ?", Time.at(time_limit.abs).utc.strftime('%H:%M')
    ).references(
      :requirement_buys
    )
  end

  scope :search_requirement_facilities, -> (weekday, time_limit) do
    where(
      "requirement_facilities.#{weekday ? "id IS NOT NULL" : "only_weekdays = false"} and
      requirement_facilities.free_time >= ?", Time.at(time_limit.abs).utc.strftime('%H:%M')
    ).references(
      :requirement_facilities
    )
  end

  scope :search_requirement_frees, -> (weekday) do
    where(
      "requirement_frees.#{weekday ? "id IS NOT NULL" : "only_weekdays = false"}"
    ).references(
      :requirement_frees
    )
  end

  scope :search_requirement_times, -> (weekday, time_limit) do
    where(
      "requirement_times.#{weekday ? "id IS NOT NULL" : "only_weekdays = false"} and
      requirement_times.free_time >= ?", Time.at(time_limit.abs).utc.strftime('%H:%M')
    ).references(
      :requirement_times
    )
  end
end
