RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_time" do
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_time) { create(:requirement_time, parking_id: existing_parking.id) }

      it "RequirementTime is deleted" do
        delete dokotomeyo_admin_requirementTime_path, params: {
          ID: existing_requirement_time.id,
        }

        expect(RequirementTime.count).to eq 0
      end
    end
  end
end
