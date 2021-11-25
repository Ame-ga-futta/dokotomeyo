class Dokotomeyo::SessionsController < ApplicationController
  before_action :authenticate_user, {
    only: [
      :logout
    ]
  }
  before_action :forbid_login_user, {
    only: [
      :login_form,
      :login,
    ]
  }

  def signup
    @user = User.new(signup_params)
    if @user.save
      session[:user_id] = @user.id
      render json: { status: 200, message: "登録完了しました" }
    else
      render json: { status: 400, message: "メールアドレス もしくはパスワードが不正です" }
    end
  end

  def login
    @user = User.find_by(
      email: login_params[:email]
    )
    if @user && @user.authenticate(login_params[:password])
      session[:user_id] = @user.id
      render json: { status: 200, message: "ログインしました" }
    else
      render json: { status: 400, message: "メールアドレス もしくはパスワードが不正です" }
    end
  end

  def logout
    session[:user_id] = nil
    render json: { status: 200, message: "ログアウトしました" }
  end

  private
    def signup_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def login_params
      params.require(:user).permit(:email, :password)
    end
end