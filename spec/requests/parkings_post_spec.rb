RSpec.describe "Parkings_post", type: :request do
  describe "POST" do
    context "confirm" do
      it "confirm responce is 200" do
        new_parking = FactoryBot.build(:parking)
        post dokotomeyo_confirm_path, params: {
          parking: {
            name: new_parking.name,
            address: new_parking.address,
            latitude: new_parking.latitude,
            longitude: new_parking.longitude,
            beginning_of_worktime: new_parking.beginning_of_worktime,
            end_of_worktime: new_parking.end_of_worktime,
          }
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end

      it "confirm responce is 400" do
        post dokotomeyo_confirm_path, params: {
          parking: {
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            beginning_of_worktime: "",
            end_of_worktime: "",
          }
        }
        expect(JSON.parse(response.body)["status"]).to eq 400
      end
    end

    context "create" do
      it "create responce is 200" do
        new_parking = FactoryBot.build(:parking)
        post dokotomeyo_post_path, params: {
          parking: {
            name: new_parking.name,
            address: new_parking.address,
            latitude: new_parking.latitude,
            longitude: new_parking.longitude,
            beginning_of_worktime: new_parking.beginning_of_worktime,
            end_of_worktime: new_parking.end_of_worktime,
          },
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end

      it "create responce is 400" do
        post dokotomeyo_post_path, params: {
          parking: {
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            beginning_of_worktime: "",
            end_of_worktime: "",
          },
        }
        expect(JSON.parse(response.body)["status"]).to eq 400
      end
    end
  end
end
