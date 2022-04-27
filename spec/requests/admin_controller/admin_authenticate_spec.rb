RSpec.describe "admin", type: :request do
  describe "GET" do
    context "authenticate" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }

      context "when admin logged" do
        before do
          post dokotomeyo_login_path, params: {
            user: { email: admin_user.email, password: "password" },
          }
        end

        it "authenticate responce is 200" do
          get dokotomeyo_authenticate_path

          expect(JSON.parse(response.body)["status"]).to eq 200
        end
      end

      context "when admin logout" do
        it "authenticate responce is 401" do
          get dokotomeyo_authenticate_path

          expect(JSON.parse(response.body)["status"]).to eq 401
        end
      end
    end
  end
end
