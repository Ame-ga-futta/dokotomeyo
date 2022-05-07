RSpec.describe "admin", type: :request do
  describe "POST" do
    context "reply_inquiry" do
      context "responce" do
        let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
        let!(:inquiry) { create(:inquiry) }

        before do
          post dokotomeyo_login_path, params: {
            user: { email: admin_user.email, password: "password" },
          }
        end

        it "reply_inquiry responce is 200" do
          post dokotomeyo_admin_reply_inquiry_path, params: {
            reply_data: {
              reply: "reply text",
              inquiryID: inquiry.id,
            }
          }

          expect(JSON.parse(response.body)["status"]).to eq 200
        end
      end
    end
  end
end
