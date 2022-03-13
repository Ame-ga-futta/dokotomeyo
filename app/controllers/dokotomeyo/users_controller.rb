class Dokotomeyo::UsersController < ApplicationController
  def get_profile
    @user = User.find(session[:user_id])
    render json: { message: @user }
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
