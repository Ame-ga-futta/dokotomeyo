RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_time" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_time) { create(:requirement_time, parking_id: existing_parking.id) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "RequirementTime is deleted" do
        delete dokotomeyo_admin_requirementTime_path, params: {
          ID: existing_requirement_time.id,
        }

        expect(RequirementTime.count).to eq 0
      end
    end
  end
end
