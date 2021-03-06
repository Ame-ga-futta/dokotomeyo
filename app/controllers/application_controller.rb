class ApplicationController < ActionController::Base
  ADMIN_USER_ID = 1
  GUEST_USER_ID = 2

  skip_before_action :verify_authenticity_token

  before_action :current_user

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authenticate_user
    if @current_user.nil?
      render json: { status: 401, message: "ログインしていません" }
    end
  end

  def forbid_login_user
    if @current_user
      render json: { status: 401, message: "すでにログインしています" }
    end
  end

  def authenticate_admin
    if @current_user.nil? || @current_user.admin == false
      render json: { status: 401, message: "ログインしていません" }
    end
  end
end
