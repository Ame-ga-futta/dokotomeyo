RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_facility" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_1) { create(:requirement_facility, parking_id: existing_parking.id) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      context "when there are 2 or more Requirements" do
        let!(:existing_requirement_1) { create(:requirement_facility, parking_id: existing_parking.id, only_weekdays: true) }

        it "RequirementFacility is deleted" do
          delete dokotomeyo_admin_requirementFacility_path, params: {
            ID: existing_requirement_1.id,
          }

          expect(RequirementFacility.count).to eq 1
        end
      end

      context "when there is 1 Requirements" do
        it "RequirementFacility is not deleted" do
          delete dokotomeyo_admin_requirementFacility_path, params: {
            ID: existing_requirement_1.id,
          }

          expect(RequirementFacility.count).to eq 1
        end
      end
    end
  end
end
