class Dokotomeyo::FavoriteController < ApplicationController
  def get_favorite_from_user
    @favorite = Favorite.where(user_id: session[:user_id])
    if @favorite
      render json: { status: 200, favorites: @favorite }
    else
      render json: { status: 400, message: "お気に入りの取得に失敗しました"}
    end
  end

  def get_favorite_from_parking
    @favorite = Favorite.where(parking_id: parking_params[:parkingID])
    if @favorite
      render json: { status: 200, favorites: @favorite }
    else
      render json: { status: 400, message: "お気に入りの取得に失敗しました"}
    end
  end

  def get_favorite_match
    if Favorite.where(user_id: session[:user_id], parking_id: parking_params[:parkingID]).exists?
      render json: { favorite: true }
    else
      render json: { favorite: false }
    end
  end

  def post_favorite
    @favorite = Favorite.find_or_initialize_by(user_id: session[:user_id], parking_id: parking_params[:parkingID])
    if Favorite.where(user_id: session[:user_id], parking_id: parking_params[:parkingID]).exists?
      @favorite.destroy
      render json: { favorite: false }
    else
      @favorite.save
      render json: { favorite: true }
    end
  end

  private

  def parking_params
    params.permit(:parkingID)
  end
end
