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
    @user = User.find(session[:user_id])
    render json: { message: @user }
  end

  def get_comment
    @user = User.find(session[:user_id])
    render json: { message: @user }
  end
end
