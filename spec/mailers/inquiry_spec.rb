RSpec.describe InquiryMailer, type: :mailer do
  describe "InquiryMailer" do
    context "send_signup" do
      let!(:new_user) { create(:user) }

      it "mail is sent when send_signup" do
        InquiryMailer.send_signup(new_user.id).deliver

        expect(ActionMailer::Base.deliveries.last.from.first).to eq(ENV['DOKOTOMEYO_GMAIL'])
        expect(ActionMailer::Base.deliveries.last.to.first).to eq(new_user.email)
        expect(ActionMailer::Base.deliveries.last.subject).to eq('dokotomeyo 新規登録の完了')
      end
    end

    context "send_delete" do
      let!(:exist_user) { create(:user) }

      it "mail is sent when send_delete" do
        InquiryMailer.send_delete(exist_user.id).deliver

        expect(ActionMailer::Base.deliveries.last.from.first).to eq(ENV['DOKOTOMEYO_GMAIL'])
        expect(ActionMailer::Base.deliveries.last.to.first).to eq(exist_user.email)
        expect(ActionMailer::Base.deliveries.last.subject).to eq('dokotomeyo 退会処理の完了')
      end
    end

    context "send_password" do
      let!(:exist_user) { create(:user) }

      it "mail is sent when send_password" do
        InquiryMailer.send_password(exist_user.id, "password").deliver

        expect(ActionMailer::Base.deliveries.last.from.first).to eq(ENV['DOKOTOMEYO_GMAIL'])
        expect(ActionMailer::Base.deliveries.last.to.first).to eq(exist_user.email)
        expect(ActionMailer::Base.deliveries.last.subject).to eq('dokotomeyo パスワードの再発行')
      end
    end

    context "send_reply" do
      let!(:inquiry) { create(:inquiry) }

      it "mail is sent when send_reply" do
        InquiryMailer.send_reply({ "reply" => "reply_text", "inquiryID" => inquiry.id }).deliver

        expect(ActionMailer::Base.deliveries.last.from.first).to eq(ENV['DOKOTOMEYO_GMAIL'])
        expect(ActionMailer::Base.deliveries.last.to.first).to eq(inquiry.address)
        expect(ActionMailer::Base.deliveries.last.subject).to eq('dokotomeyo お問い合わせについての返信')
      end
    end
  end
end
