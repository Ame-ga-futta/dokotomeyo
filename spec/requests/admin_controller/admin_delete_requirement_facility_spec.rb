RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_facility" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_facility) { create(:requirement_facility, parking_id: existing_parking.id) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "RequirementFacility is deleted" do
        delete dokotomeyo_admin_requirementFacility_path, params: {
          ID: existing_requirement_facility.id,
        }

        expect(RequirementFacility.count).to eq 0
      end
    end
  end
end
