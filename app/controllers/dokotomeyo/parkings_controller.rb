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
end
