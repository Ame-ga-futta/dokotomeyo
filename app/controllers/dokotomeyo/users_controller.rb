class Dokotomeyo::UsersController < ApplicationController
  before_action :authenticate_user, {
    only: [
      :get_profile,
      :get_username,
      :update_name,
      :update_email,
      :update_password,
    ],
  }

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

  def update_name
    @user = User.find_by_id(session[:user_id])
    if @user.update(update_name_params)
      render json: { status: 200, message: "変更しました" }
    else
      render json: { status: 400, message: @user.errors.full_messages }
    end
  end

  def update_email
    @user = User.find_by_id(session[:user_id])
    if @user.update(update_email_params)
      render json: { status: 200, message: "変更しました" }
    else
      render json: { status: 400, message: @user.errors.full_messages }
    end
  end

  def update_password
    @user = User.find_by_id(session[:user_id])
    if @user.authenticate(update_password_params[:currentPassword])
      if @user.update(password: update_password_params[:password], password_confirmation: update_password_params[:password_confirmation])
        render json: { status: 200, message: "変更しました" }
      else
        render json: { status: 400, message: @user.errors.full_messages }
      end
    else
      render json: { status: 400, message: "パスワードが不正です" }
    end
  end

  private

  def user_params
    params.permit(:userID)
  end

  def update_name_params
    params.require(:user).permit(
      :name
    )
  end

  def update_email_params
    params.require(:user).permit(
      :email
    )
  end

  def update_password_params
    params.require(:user).permit(
      :currentPassword,
      :password,
      :password_confirmation
    )
  end
end
