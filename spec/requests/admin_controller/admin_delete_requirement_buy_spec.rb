RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_buy" do
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_buy) { create(:requirement_buy, parking_id: existing_parking.id) }

      it "RequirementBuy is deleted" do
        delete dokotomeyo_admin_requirementBuy_path, params: {
          ID: existing_requirement_buy.id,
        }

        expect(RequirementBuy.count).to eq 0
      end
    end
  end
end
