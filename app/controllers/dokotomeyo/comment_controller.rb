class Dokotomeyo::CommentController < ApplicationController
  def get_comment_from_user
    @comment = Comment.where(user_id: session[:user_id])
    if @comment
      render json: { status: 200, comments: @comment }
    else
      render json: { status: 400, message: "コメントの取得に失敗しました"}
    end
  end

  def get_comment_from_parking
    @comment = Comment.where(parking_id: parking_params[:parkingID])
    if @comment
      render json: { status: 200, comments: @comment }
    else
      render json: { status: 400, message: "コメントの取得に失敗しました"}
    end
  end

  private

  def parking_params
    params.permit(:parkingID)
  end
end
