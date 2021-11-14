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

  def login_form
  end

  def login
    @user = User.find_by(
      email: params[:email]
    )
    if @user && @user.authenticate(params[:password])
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
end
