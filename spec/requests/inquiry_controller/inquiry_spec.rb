RSpec.describe "Inquiries", type: :request do
  describe "GET" do
    context "get_inquiry" do
      let!(:exist_inquiry_1) { create(:inquiry, id: 1) }
      let!(:exist_inquiry_2) { create(:inquiry, id: 2) }
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "get_inquiry responce is 200" do
        get dokotomeyo_inquiry_path

        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end

  describe "POST" do
    context "post_inquiry" do
      it "post_inquiry responce is 200" do
        post dokotomeyo_inquiry_path, params: {
          post_inquiry: { address: "test@gmail.com", message: "test", name: "test" },
        }

        expect(JSON.parse(response.body)["status"]).to eq 200
      end

      it "post_inquiry responce is 400 when does not pass validation" do
        post dokotomeyo_inquiry_path, params: {
          post_inquiry: { address: "", message: "", name: "" },
        }

        expect(JSON.parse(response.body)["status"]).to eq 400
      end
    end
  end
end
