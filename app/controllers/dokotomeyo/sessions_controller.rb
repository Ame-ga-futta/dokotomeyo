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
      flash[:notice] = "登録完了しました"
      redirect_to("/dokotomeyo")
    else
      flash[:notice] = "メールアドレス もしくはパスワードが不正です"
      redirect_to("/dokotomeyo/signup")
    end
  end

  def login
    @user = User.find_by(
      email: login_params[:email]
    )
    if @user && @user.authenticate(login_params[:password])
      session[:user_id] = @user.id
      flash[:notice] = "ログインしました"
      redirect_to("/dokotomeyo")
    else
      @input = params[:email]
      flash[:notice] = "メールアドレス もしくはパスワードが不正です"
      redirect_to("/dokotomeyo/login")
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = "ログアウトしました"
    redirect_to("/dokotomeyo")
  end

  private
    def signup_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def login_params
      params.require(:user).permit(:email, :password)
    end
end
