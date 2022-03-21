class Dokotomeyo::UsersController < ApplicationController
  def get_profile
    @user = User.find_by_id(session[:user_id])
    if @user
      render json: { status: 200, name: @user.name, email: @user.email }
    else
      render json: { status: 400, message: "ユーザー情報の取得に失敗しました" }
    end
  end

  def get_username
    @user = User.find_by_id(user_params[:userID])
    if @user
      render json: { status: 200, name: @user.name }
    else
      render json: { status: 400, message: "ユーザー情報の取得に失敗しました" }
    end
  end

  private

  def user_params
    params.permit(:userID)
  end
end
