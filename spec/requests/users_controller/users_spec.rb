RSpec.describe "top", type: :request do
  describe "GET" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "get_profile" do
      it "get_profile responce is 200" do
        get dokotomeyo_profile_path
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end

    context "get_username" do
      it "get_username responce is 200 with userID" do
        get dokotomeyo_username_path, params: {
          userID: existing_user.id
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end

      it "get_username responce is 400 without userID" do
        get dokotomeyo_username_path, params: {
          userID: ""
        }
        expect(JSON.parse(response.body)["status"]).to eq 400
      end
    end
  end
end
