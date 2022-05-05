RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_user" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_user) { create(:user) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "User is deleted" do
        delete dokotomeyo_admin_user_path, params: {
          ID: existing_user.id,
        }

        expect(User.count).to eq 1
      end
    end
  end
end
