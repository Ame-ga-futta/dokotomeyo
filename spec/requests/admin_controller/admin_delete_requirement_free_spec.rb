RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_free" do
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_free) { create(:requirement_free, parking_id: existing_parking.id) }

      it "RequirementFree is deleted" do
        delete dokotomeyo_admin_requirementFree_path, params: {
          ID: existing_requirement_free.id,
        }

        expect(RequirementFree.count).to eq 0
      end
    end
  end
end
