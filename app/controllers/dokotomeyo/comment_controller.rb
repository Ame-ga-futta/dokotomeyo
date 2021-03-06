class Dokotomeyo::CommentController < ApplicationController
  before_action :authenticate_user, {
    only: [
      :get_comment_from_user,
      :post_comment,
      :delete_comment,
    ],
  }

  def get_comment_from_user
    @comment = Comment.where(user_id: session[:user_id])
    if @comment
      render json: { status: 200, comments: @comment }
    else
      render json: { status: 400, message: "コメントの取得に失敗しました" }
    end
  end

  def get_comment_from_parking
    @comment = Comment.where(parking_id: parking_params[:parkingID])
    if @comment
      render json: { status: 200, comments: @comment }
    else
      render json: { status: 400, message: "コメントの取得に失敗しました" }
    end
  end

  def post_comment
    @new_comment = Comment.new(
      parking_id: post_params[:parking_id],
      user_id: session[:user_id],
      comment: post_params[:comment]
    )
    if @new_comment.save
      render json: { status: 200, message: "投稿完了しました" }
    else
      render json: { status: 400, message: @new_comment.errors.full_messages }
    end
  end

  def delete_comment
    @delete_comment = Comment.find(comment_params[:commentID])
    @delete_comment.destroy
    render json: { status: 200 }
  end

  private

  def parking_params
    params.permit(:parkingID)
  end

  def comment_params
    params.permit(:commentID)
  end

  def post_params
    params.require(:post_comment).permit(
      :parking_id,
      :comment
    )
  end
end
