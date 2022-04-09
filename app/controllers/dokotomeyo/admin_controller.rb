class Dokotomeyo::AdminController < ApplicationController
  def get_users
    @users = users_assmble_chain
    if @users
      render json: { status: 200, users: @users }
    else
      render json: { status: 400 }
    end
  end

  def get_parkings
    @parkings = parkings_assmble_chain
    if @parkings
      render json: { status: 200, parkings: @parkings }
    else
      render json: { status: 400 }
    end
  end

  def get_requirement_frees
    @requirements = requirement_frees_assmble_chain
    if @requirements
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def get_requirement_buys
    @requirements = requirement_buys_assmble_chain
    if @requirements
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def get_requirement_facilities
    @requirements = requirement_facilities_assmble_chain
    if @requirements
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def get_requirement_times
    @requirements = requirement_times_assmble_chain
    if @requirements
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def get_comments
    @comments = comments_assmble_chain
    if @comments
      render json: { status: 200, comments: @comments }
    else
      render json: { status: 400 }
    end
  end

  def get_favorites
    @favorites = favorites_assmble_chain
    if @favorites
      render json: { status: 200, favorites: @favorites }
    else
      render json: { status: 400 }
    end
  end

  private

  def get_params
    params.permit(:select, :input)
  end

  def users_assmble_chain
    case get_params[:select]
    when "1" then
      User.find_by(id: get_params[:input])
    when "2" then
      User.where('name LIKE ?', "%#{get_params[:input]}%")
    when "3" then
      User.where('email LIKE ?', "%#{get_params[:input]}%")
    when "4" then
      User.where('name LIKE ? OR email LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def parkings_assmble_chain
    case get_params[:select]
    when "1" then
      Parking.find_by(id: get_params[:input])
    when "2" then
      Parking.where('name LIKE ?', "%#{get_params[:input]}%")
    when "3" then
      Parking.where('address LIKE ?', "%#{get_params[:input]}%")
    when "4" then
      Parking.where('name LIKE ? OR address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_frees_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementFree.find_by(id: get_params[:input])
    when "2" then
      RequirementFree.where(parking_id: get_params[:input])
    when "3" then
      RequirementFree.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_buys_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementBuy.find_by(id: get_params[:input])
    when "2" then
      RequirementBuy.where(parking_id: get_params[:input])
    when "3" then
      RequirementBuy.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_facilities_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementFacility.find_by(id: get_params[:input])
    when "2" then
      RequirementFacility.where(parking_id: get_params[:input])
    when "3" then
      RequirementFacility.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_times_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementTime.find_by(id: get_params[:input])
    when "2" then
      RequirementTime.where(parking_id: get_params[:input])
    when "3" then
      RequirementTime.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def comments_assmble_chain
    case get_params[:select]
    when "1" then
      Comment.find_by(id: get_params[:input])
    when "2" then
      Comment.where(parking_id: get_params[:input])
    when "3" then
      Comment.where(user_id: get_params[:input])
    when "4" then
      Comment.joins(:user, :parking).where('comment LIKE ? OR parkings.name LIKE ? OR parkings.address LIKE ? OR users.name LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%", "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def favorites_assmble_chain
    case get_params[:select]
    when "1" then
      Favorite.find_by(id: get_params[:input])
    when "2" then
      Favorite.where(parking_id: get_params[:input])
    when "3" then
      Favorite.where(user_id: get_params[:input])
    when "4" then
      Favorite.joins(:user, :parking).where('parkings.name LIKE ? OR parkings.address LIKE ? OR users.name LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end
end
