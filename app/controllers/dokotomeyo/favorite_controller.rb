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

  private

  def parking_params
    params.permit(:parkingID)
  end
end
