class InquiryMailer < ApplicationMailer
  def send_signup(user_id)
    @user = User.find(user_id)
    mail(
      to: @user.email,
      subject: "dokotomeyo 新規登録の完了"
    )
  end

  def send_delete(user_id)
    @user = User.find(user_id)
    mail(
      to: @user.email,
      subject: "dokotomeyo 退会処理の完了"
    )
  end

  def send_password(user_id, new_password)
    @user = User.find(user_id)
    @new_password = new_password
    mail(
      to: @user.email,
      subject: "dokotomeyo パスワードの再発行"
    )
  end

  def send_reply(reply_data)
    @inquiry = Inquiry.find(reply_data["inquiryID"])
    @repry = reply_data["reply"]
    mail(
      to: @inquiry.address,
      subject: "dokotomeyo お問い合わせについての返信"
    )
    @inquiry.destroy
  end
end
