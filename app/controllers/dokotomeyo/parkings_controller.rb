class Dokotomeyo::ParkingsController < ApplicationController
  def confirm
    @parking = Parking.new(create_params[:parking])

    case create_params[:requirement_type]
    when "free" then
      @requirement = @parking.requirement_frees.new(create_params[:requirement].reject { |k, v| v == "" })
    when "time" then
      @requirement = @parking.requirement_times.new(create_params[:requirement].reject { |k, v| v == "" })
    when "buy" then
      @requirement = @parking.requirement_buys.new(create_params[:requirement].reject { |k, v| v == "" })
    when "facility" then
      @requirement = @parking.requirement_facilities.new(create_params[:requirement].reject { |k, v| v == "" })
    end

    if @parking.valid? && @requirement.valid?
      render json: { status: 200 }
    else
      render json: { status: 400, message: @parking.errors.full_messages.push(@requirement.errors.full_messages).flatten }
    end
  end

  def create
    @parking = Parking.new(create_params[:parking])

    case create_params[:requirement_type]
    when "free" then
      @requirement = @parking.requirement_frees.new(create_params[:requirement].reject { |k, v| v == "" })
    when "time" then
      @requirement = @parking.requirement_times.new(create_params[:requirement].reject { |k, v| v == "" })
    when "buy" then
      @requirement = @parking.requirement_buys.new(create_params[:requirement].reject { |k, v| v == "" })
    when "facility" then
      @requirement = @parking.requirement_facilities.new(create_params[:requirement].reject { |k, v| v == "" })
    end

    if @parking.save && @requirement.save
      render json: { status: 200, message: "投稿完了しました" }
    else
      render json: { status: 400, message: @parking.errors.full_messages.push(@requirement.errors.full_messages).flatten }
    end
  end

  def search
    if validate_search then
      time_limit = Time.parse(search_params[:narrowDown][:start_date]) - Time.parse(search_params[:narrowDown][:end_date])
      south_end = search_params[:mapCenter][:lat] - 0.009
      north_end = search_params[:mapCenter][:lat] + 0.009
      west_end = search_params[:mapCenter][:lng] - 0.011
      east_end = search_params[:mapCenter][:lng] + 0.011

      if time_limit < 0
        start_time = search_params[:narrowDown][:start_date].in_time_zone('Tokyo')
        end_time = search_params[:narrowDown][:start_date].in_time_zone('Tokyo') - time_limit
      else
        start_time = search_params[:narrowDown][:start_date].in_time_zone('Tokyo')
        end_time = search_params[:narrowDown][:start_date].in_time_zone('Tokyo').tomorrow - time_limit
      end

      requirements = [:requirement_frees]
      requirements.push(:requirement_buys) if search_params[:narrowDown][:include_buy]
      requirements.push(:requirement_facilities) if search_params[:narrowDown][:include_facility]
      requirements.push(:requirement_times) if search_params[:narrowDown][:include_time]

      @parkings = Parking.includes_requirement(requirements).search_requirement_frees(weekday_check(start_time, end_time))
      if search_params[:narrowDown][:include_buy] then
        @parkings = @parkings.or(
          Parking.includes_requirement(requirements).search_requirement_buys(weekday_check(start_time, end_time), time_limit)
        )
      end

      if search_params[:narrowDown][:include_facility] then
        @parkings = @parkings.or(
          Parking.includes_requirement(requirements).search_requirement_facilities(weekday_check(start_time, end_time), time_limit)
        )
      end

      if search_params[:narrowDown][:include_time] then
        @parkings = @parkings.or(
          Parking.includes_requirement(requirements).search_requirement_times(weekday_check(start_time, end_time), time_limit)
        )
      end

      render json: { status: 200, parkings: [
        @parkings,
      ] }
    end
  end

  private

  def create_params
    params.require(:post_parking).permit(
      :requirement_type,
      parking: [
        :name, :address, :latitude, :longitude, :beginning_of_worktime, :end_of_worktime,
      ],
      requirement: [
        :facility_name, :purchase_price, :free_time, :only_weekdays,
      ]
    )
  end

  def search_params
    params.require(:search_parking).permit(
      mapCenter: [
        :lat, :lng,
      ],
      narrowDown: [
        :place, :start_date, :end_date, :include_time, :include_buy, :include_facility,
      ]
    )
  end

  def validate_search
    if search_params[:narrowDown][:place] == "" || search_params[:narrowDown][:start_date] == "" || search_params[:narrowDown][:end_date] == "" then
      render json: { status: 400, message: "必要な情報を入力してください" }
      return false
    elsif search_params[:narrowDown][:start_date] == search_params[:narrowDown][:end_date] then
      render json: { status: 400, message: "入庫時刻と出庫時刻は、同じ時間にできません" }
      return false
    else
      return true
    end
  end

  def weekday_check(start_time, end_time)
    return false if HolidayJapan.check(start_time.to_date) || start_time.saturday? || start_time.sunday?
    return false if HolidayJapan.check(end_time.to_date) || end_time.saturday? || end_time.sunday?
    true
  end
end
