RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_parking" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_parking) { create(:parking) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "Parking is deleted" do
        delete dokotomeyo_admin_parking_path, params: {
          ID: existing_parking.id,
        }

        expect(Parking.count).to eq 0
      end
    end
  end
end
