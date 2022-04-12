RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_facility" do
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_facility) { create(:requirement_facility, parking_id: existing_parking.id) }

      it "RequirementFacility is deleted" do
        delete dokotomeyo_admin_requirementFacility_path, params: {
          ID: existing_requirement_facility.id,
        }

        expect(RequirementFacility.count).to eq 0
      end
    end
  end
end
