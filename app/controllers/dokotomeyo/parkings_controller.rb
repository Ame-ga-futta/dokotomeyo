class Dokotomeyo::ParkingsController < ApplicationController
  def create
    @parking = Parking.new(create_params)
    if @parking.save
      render json: { status: 200, message: "投稿完了しました" }
    else
      render json: { status: 400, message: @parking.errors.full_messages }
    end
  end

  private

  def create_params
    params.require(:parking).permit(:name, :address, :latitude, :longitude, :beginning_of_worktime, :end_of_worktime)
  end
end
