RSpec.describe "Parkings", type: :request do
  describe "POST" do
    context "edit_hold" do
      it "edit_hold responce is 200 with params" do
        post dokotomeyo_edit_hold_path, params: {
          edit_parking_detail: {
            parking: "test",
            requirement_buy: {},
            requirement_facility: {},
            requirement_free: {},
            requirement_time: {},
          }
        }

        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end
end
