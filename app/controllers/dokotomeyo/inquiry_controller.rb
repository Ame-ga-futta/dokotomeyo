class Dokotomeyo::InquiryController < ApplicationController
  before_action :authenticate_admin, {
    only: [
      :get_inquiry,
    ],
  }

  def get_inquiry
    @inquiries = Inquiry.all

    if @inquiries
      render json: { status: 200, inquiries: @inquiries }
    else
      render json: { status: 400, message: "問い合わせデータの取得に失敗しました" }
    end
  end

  def post_inquiry
    @new_inquiry = Inquiry.new(inquiry_params)

    if @new_inquiry.save
      render json: { status: 200, message: "投稿完了しました" }
    else
      render json: { status: 400, message: @new_inquiry.errors.full_messages }
    end
  end

  private

  def inquiry_params
    params.require(:post_inquiry).permit(
      :address,
      :message,
      :name,
    )
  end
end
