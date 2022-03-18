class Dokotomeyo::UsersController < ApplicationController
  def get_profile
    @user = User.find(session[:user_id])
    if @user
      render json: { status: 200, name: @user.name, email: @user.email }
    else
      render json: { status: 400, message: "ユーザー情報の取得に失敗しました" }
    end
  end

  def get_favorite
    @favorite = Favorite.where(user_id: session[:user_id])
    if @favorite
      render json: { status: 200, favorites: @favorite }
    else
      render json: { status: 400, message: "お気に入りの取得に失敗しました"}
    end
  end

  def get_comment
    @comment = Comment.where(user_id: session[:user_id])
    if @comment
      render json: { status: 200, comments: @comment }
    else
      render json: { status: 400, message: "コメントの取得に失敗しました"}
    end
  end
end
