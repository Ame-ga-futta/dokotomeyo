class Dokotomeyo::FavoriteController < ApplicationController
  def get_favorite
    @favorite = Favorite.where(user_id: session[:user_id])
    if @favorite
      render json: { status: 200, favorites: @favorite }
    else
      render json: { status: 400, message: "お気に入りの取得に失敗しました"}
    end
  end
end
