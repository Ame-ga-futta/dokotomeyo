RSpec.describe "Parkings", type: :request do
  describe "GET" do
    let!(:existing_parking) { create:parking }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }

    context "details" do
      it "details responce is 200" do
        get dokotomeyo_details_path, params: {
          parkingID: existing_parking.id
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end
end
