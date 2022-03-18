class Dokotomeyo::CommentController < ApplicationController
  def get_comment
    @comment = Comment.where(user_id: session[:user_id])
    if @comment
      render json: { status: 200, comments: @comment }
    else
      render json: { status: 400, message: "コメントの取得に失敗しました"}
    end
  end
end
