class Dokotomeyo::ParkingsController < ApplicationController
  LAT_PER_KIROMETER = 0.009
  LNG_PER_KIROMETER = 0.011

  def new_confirm
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

  def new_create
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

  def add_confirm
    @parking = Parking.find(add_params[:parkingID])

    case add_params[:requirement_type]
    when "free" then
      @requirement = @parking.requirement_frees.new(add_params[:requirement].reject { |k, v| v == "" })
    when "time" then
      @requirement = @parking.requirement_times.new(add_params[:requirement].reject { |k, v| v == "" })
    when "buy" then
      @requirement = @parking.requirement_buys.new(add_params[:requirement].reject { |k, v| v == "" })
    when "facility" then
      @requirement = @parking.requirement_facilities.new(add_params[:requirement].reject { |k, v| v == "" })
    end

    if @requirement.valid?
      render json: { status: 200 }
    else
      render json: { status: 400, message: @requirement.errors.full_messages.flatten }
    end
  end

  def add_create
    @parking = Parking.find(add_params[:parkingID])

    case add_params[:requirement_type]
    when "free" then
      @requirement = @parking.requirement_frees.new(add_params[:requirement].reject { |k, v| v == "" })
    when "time" then
      @requirement = @parking.requirement_times.new(add_params[:requirement].reject { |k, v| v == "" })
    when "buy" then
      @requirement = @parking.requirement_buys.new(add_params[:requirement].reject { |k, v| v == "" })
    when "facility" then
      @requirement = @parking.requirement_facilities.new(add_params[:requirement].reject { |k, v| v == "" })
    end

    if @requirement.save
      render json: { status: 200, message: "追加完了しました" }
    else
      render json: { status: 400, message: @requirement.errors.full_messages.flatten }
    end
  end

  def edit_confirm
    @exist_parking = Parking.find(edit_params[:parking][:id])
    @update_parking = Parking.new(edit_params[:parking])
    error_message = []
    requirement_count = @exist_parking.requirement_frees.size +
                        @exist_parking.requirement_times.size +
                        @exist_parking.requirement_buys.size +
                        @exist_parking.requirement_facilities.size
    delete_count = 0

    unless @update_parking.valid?
      error_message.push(@update_parking.errors.full_messages)
    end

    edit_params[:requirement_free].each do |key, requirement|
      requirement_free = @update_parking.requirement_frees.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_free.valid?
          error_message.push(requirement_free.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_time].each do |key, requirement|
      requirement_time = @update_parking.requirement_times.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_time.valid?
          error_message.push(requirement_time.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_buy].each do |key, requirement|
      requirement_buy = @update_parking.requirement_buys.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_buy.valid?
          error_message.push(requirement_buy.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_facility].each do |key, requirement|
      requirement_facility = @update_parking.requirement_facilities.new(requirement[:requirements].reject { |k, v| v == "" })
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

    if error_message.flatten.uniq.empty?
      render json: { status: 200, message: "成功" }
    else
      render json: { status: 400, message: error_message.flatten.uniq }
    end
  end

  def edit_create
    @exist_parking = Parking.find(edit_params[:parking][:id])
    @update_parking = Parking.new(edit_params[:parking])
    error_message = []
    requirement_count = @exist_parking.requirement_frees.size +
                        @exist_parking.requirement_times.size +
                        @exist_parking.requirement_buys.size +
                        @exist_parking.requirement_facilities.size
    delete_count = 0

    unless @update_parking.valid?
      error_message.push(@update_parking.errors.full_messages)
    end

    edit_params[:requirement_free].each do |key, requirement|
      requirement_free = @update_parking.requirement_frees.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_free.valid?
          error_message.push(requirement_free.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_time].each do |key, requirement|
      requirement_time = @update_parking.requirement_times.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_time.valid?
          error_message.push(requirement_time.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_buy].each do |key, requirement|
      requirement_buy = @update_parking.requirement_buys.new(requirement[:requirements].reject { |k, v| v == "" })
      if requirement[:delete]
        delete_count += 1
      else
        unless requirement_buy.valid?
          error_message.push(requirement_buy.errors.full_messages)
        end
      end
    end

    edit_params[:requirement_facility].each do |key, requirement|
      requirement_facility = @update_parking.requirement_facilities.new(requirement[:requirements].reject { |k, v| v == "" })
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

    if error_message.flatten.uniq.empty?
      @exist_parking.update(edit_params[:parking])

      edit_params[:requirement_free].each do |key, requirement|
        exist_requirement = @exist_parking.requirement_frees.find(key)

        if requirement[:delete]
          exist_requirement.destroy
        else
          exist_requirement.update(requirement[:requirements].reject { |k, v| v == "" })
        end
      end

      edit_params[:requirement_time].each do |key, requirement|
        exist_requirement = @exist_parking.requirement_times.find(key)

        if requirement[:delete]
          exist_requirement.destroy
        else
          exist_requirement.update(requirement[:requirements].reject { |k, v| v == "" })
        end
      end

      edit_params[:requirement_buy].each do |key, requirement|
        exist_requirement = @exist_parking.requirement_buys.find(key)

        if requirement[:delete]
          exist_requirement.destroy
        else
          exist_requirement.update(requirement[:requirements].reject { |k, v| v == "" })
        end
      end

      edit_params[:requirement_facility].each do |key, requirement|
        exist_requirement = @exist_parking.requirement_facilities.find(key)

        if requirement[:delete]
          exist_requirement.destroy
        else
          exist_requirement.update(requirement[:requirements].reject { |k, v| v == "" })
        end
      end

      render json: { status: 200, message: "成功" }
    else
      render json: { status: 400, message: error_message.flatten.uniq }
    end
  end

  def search
    if validate_search then
      time_limit = Time.parse(search_params[:narrowDown][:start_date]) - Time.parse(search_params[:narrowDown][:end_date])
      south_end = BigDecimal("#{search_params[:mapCenter][:lat]}") - LAT_PER_KIROMETER
      north_end = BigDecimal("#{search_params[:mapCenter][:lat]}") + LAT_PER_KIROMETER
      west_end = BigDecimal("#{search_params[:mapCenter][:lng]}") - LNG_PER_KIROMETER
      east_end = BigDecimal("#{search_params[:mapCenter][:lng]}") + LNG_PER_KIROMETER

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

      @parkings = assemble_chain(requirements, south_end, north_end, west_end, east_end, start_time, end_time)
      .search_requirement_frees(weekday_check(start_time, end_time))

      if search_params[:narrowDown][:include_buy] then
        @parkings = @parkings.or(
          assemble_chain(requirements, south_end, north_end, west_end, east_end, start_time, end_time)
          .search_requirement_buys(weekday_check(start_time, end_time), time_limit)
        )
      end

      if search_params[:narrowDown][:include_facility] then
        @parkings = @parkings.or(
          assemble_chain(requirements, south_end, north_end, west_end, east_end, start_time, end_time)
          .search_requirement_facilities(weekday_check(start_time, end_time), time_limit)
        )
      end

      if search_params[:narrowDown][:include_time] then
        @parkings = @parkings.or(
          assemble_chain(requirements, south_end, north_end, west_end, east_end, start_time, end_time)
          .search_requirement_times(weekday_check(start_time, end_time), time_limit)
        )
      end

      sorted = @parkings.sort_by do |parking|
        (parking[:latitude] - BigDecimal("#{search_params[:mapCenter][:lat]}")).abs +
        (parking[:longitude] - BigDecimal("#{search_params[:mapCenter][:lng]}")).abs
      end

      render json: { status: 200, parkings: [
        sorted,
      ] }
    end
  end

  def details
    @parking = Parking.find(details_params[:parkingID])

    render json: {
      status: 200,
      parking: @parking,
      requirements_weekday: {
        requirement_buys: @parking.requirement_buys.where(only_weekdays: true),
        requirement_facilities: @parking.requirement_facilities.where(only_weekdays: true),
        requirement_frees: @parking.requirement_frees.where(only_weekdays: true),
        requirement_times: @parking.requirement_times.where(only_weekdays: true)
      },
      requirements_holiday: {
        requirement_buys: @parking.requirement_buys.where(only_weekdays: false),
        requirement_facilities: @parking.requirement_facilities.where(only_weekdays: false),
        requirement_frees: @parking.requirement_frees.where(only_weekdays: false),
        requirement_times: @parking.requirement_times.where(only_weekdays: false)
      }
    }
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

  def add_params
    params.require(:add_requirement).permit(
      :requirement_type,
      :parkingID,
      requirement: [
        :facility_name, :purchase_price, :free_time, :only_weekdays,
      ]
    )
  end

  def edit_params
    params.require(:edit_parking_detail).permit(
      parking: {},
      requirement_buy: {},
      requirement_facility: {},
      requirement_free: {},
      requirement_time: {}
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

  def details_params
    params.permit(:parkingID)
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

  def assemble_chain(requirements, south_end, north_end, west_end, east_end, start_time, end_time)
    Parking.includes_requirement(requirements)
    .search_in_bounds(south_end, north_end, west_end, east_end)
    .search_in_worktime(start_time.strftime("%T"), end_time.strftime("%T"))
  end
end
