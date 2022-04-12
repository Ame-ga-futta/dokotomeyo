RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_user" do
      let!(:existing_user) { create(:user) }

      it "User is deleted" do
        delete dokotomeyo_admin_user_path, params: {
          ID: existing_user.id,
        }

        expect(User.count).to eq 0
      end
    end
  end
end
