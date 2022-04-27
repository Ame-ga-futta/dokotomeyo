class Dokotomeyo::AdminController < ApplicationController
  before_action :authenticate_admin

  def authenticate
    render json: { status: 200 }
  end

  def get_users
    @users = users_assmble_chain
    unless @users.empty?
      render json: { status: 200, users: @users }
    else
      render json: { status: 400 }
    end
  end

  def delete_user
    @user = User.find(delete_params[:ID])
    @user.destroy
  end

  def get_parkings
    @parkings = parkings_assmble_chain
    unless @parkings.empty?
      render json: { status: 200, parkings: @parkings }
    else
      render json: { status: 400 }
    end
  end

  def delete_parking
    @parking = Parking.find(delete_params[:ID])
    @parking.destroy
  end

  def get_requirement_frees
    @requirements = requirement_frees_assmble_chain
    unless @requirements.empty?
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def delete_requirement_free
    @requirement = RequirementFree.find(delete_params[:ID])
    @requirement.destroy
  end

  def get_requirement_buys
    @requirements = requirement_buys_assmble_chain
    unless @requirements.empty?
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def delete_requirement_buy
    @requirement = RequirementBuy.find(delete_params[:ID])
    @requirement.destroy
  end

  def get_requirement_facilities
    @requirements = requirement_facilities_assmble_chain
    unless @requirements.empty?
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def delete_requirement_facility
    @requirement = RequirementFacility.find(delete_params[:ID])
    @requirement.destroy
  end

  def get_requirement_times
    @requirements = requirement_times_assmble_chain
    unless @requirements.empty?
      render json: { status: 200, requirements: @requirements }
    else
      render json: { status: 400 }
    end
  end

  def delete_requirement_time
    @requirement = RequirementTime.find(delete_params[:ID])
    @requirement.destroy
  end

  def get_comments
    @comments = comments_assmble_chain
    unless @comments.empty?
      render json: { status: 200, comments: @comments }
    else
      render json: { status: 400 }
    end
  end

  def delete_comment
    @comment = Comment.find(delete_params[:ID])
    @comment.destroy
  end

  def get_favorites
    @favorites = favorites_assmble_chain
    unless @favorites.empty?
      render json: { status: 200, favorites: @favorites }
    else
      render json: { status: 400 }
    end
  end

  def delete_favorite
    @favorite = Favorite.find(delete_params[:ID])
    @favorite.destroy
  end

  private

  def get_params
    params.permit(:select, :input)
  end

  def delete_params
    params.permit(:ID)
  end

  def users_assmble_chain
    case get_params[:select]
    when "1" then
      User.where(id: get_params[:input])
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
      Parking.where(id: get_params[:input])
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
      RequirementFree.where(id: get_params[:input])
    when "2" then
      RequirementFree.where(parking_id: get_params[:input])
    when "3" then
      RequirementFree.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_buys_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementBuy.where(id: get_params[:input])
    when "2" then
      RequirementBuy.where(parking_id: get_params[:input])
    when "3" then
      RequirementBuy.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_facilities_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementFacility.where(id: get_params[:input])
    when "2" then
      RequirementFacility.where(parking_id: get_params[:input])
    when "3" then
      RequirementFacility.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def requirement_times_assmble_chain
    case get_params[:select]
    when "1" then
      RequirementTime.where(id: get_params[:input])
    when "2" then
      RequirementTime.where(parking_id: get_params[:input])
    when "3" then
      RequirementTime.joins(:parking).where('parkings.name LIKE ? OR parkings.address LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end

  def comments_assmble_chain
    case get_params[:select]
    when "1" then
      Comment.where(id: get_params[:input])
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
      Favorite.where(id: get_params[:input])
    when "2" then
      Favorite.where(parking_id: get_params[:input])
    when "3" then
      Favorite.where(user_id: get_params[:input])
    when "4" then
      Favorite.joins(:user, :parking).where('parkings.name LIKE ? OR parkings.address LIKE ? OR users.name LIKE ?', "%#{get_params[:input]}%", "%#{get_params[:input]}%", "%#{get_params[:input]}%")
    end
  end
end
