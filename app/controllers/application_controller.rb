class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :current_user

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authenticate_user
    if @current_user == nil
      render json: { status: 401, message: "ログインしていません" }
    end
  end

  def forbid_login_user
    if @current_user
      render json: { status: 401, message: "すでにログインしています" }
    end
  end
end
