RSpec.describe "top", type: :request do
  describe "GET" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "profile" do
      it "get_profile responce is 200" do
        get dokotomeyo_profile_path
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end
end