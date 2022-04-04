class Dokotomeyo::FavoriteController < ApplicationController
  before_action :authenticate_user, {
    only: [
      :get_favorite_from_user,
      :get_favorite_match,
      :post_favorite,
      :delete_favorite,
    ],
  }

  def get_favorite_from_user
    @favorite = Favorite.where(user_id: session[:user_id])
    if @favorite
      render json: { status: 200, favorites: @favorite }
    else
      render json: { status: 400, message: "お気に入りの取得に失敗しました" }
    end
  end

  def get_favorite_from_parking
    @favorite = Favorite.where(parking_id: parking_params[:parkingID])
    if @favorite
      render json: { status: 200, favorites: @favorite }
    else
      render json: { status: 400, message: "お気に入りの取得に失敗しました" }
    end
  end

  def get_favorite_match
    if Favorite.exists?(user_id: session[:user_id], parking_id: parking_params[:parkingID])
      render json: { favorite: true }
    else
      render json: { favorite: false }
    end
  end

  def post_favorite
    @favorite = Favorite.find_or_initialize_by(user_id: session[:user_id], parking_id: parking_params[:parkingID])
    if Favorite.exists?(user_id: session[:user_id], parking_id: parking_params[:parkingID])
      @favorite.destroy
      render json: { favorite: false }
    else
      @favorite.save
      render json: { favorite: true }
    end
  end

  def delete_favorite
    @delete_favorite = Favorite.find(favorite_params[:favoriteID])
    @delete_favorite.destroy
    render json: { status: 200 }
  end

  private

  def parking_params
    params.permit(:parkingID)
  end

  def favorite_params
    params.permit(:favoriteID)
  end
end
