RSpec.describe "Parkings", type: :request do
  describe "POST" do
    let!(:parking) { create(:parking) }
    let!(:existing_requirement) { create(:requirement_free, parking_id: parking.id) }
    let(:add_requirement_buy) { create(:requirement_buy, parking_id: parking.id) }
    let(:add_requirement_facility) { create(:requirement_facility, parking_id: parking.id) }
    let(:add_requirement_free) { create(:requirement_free, parking_id: parking.id) }
    let(:add_requirement_time) { create(:requirement_time, parking_id: parking.id) }

    context "add_create" do
      context "add RequirementBuy" do
        it "add_create responce is 200 with fulldata" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "buy",
              parkingID: parking.id,
              requirement: {
                facility_name: add_requirement_buy.facility_name,
                purchase_price: add_requirement_buy.purchase_price,
                free_time: add_requirement_buy.free_time,
                only_weekdays: add_requirement_buy.only_weekdays,
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "add_create responce is 400 without RequirementBuy data" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "buy",
              parkingID: parking.id,
              requirement: {
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "add RequirementFacility" do
        it "add_create responce is 200 with fulldata" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "facility",
              parkingID: parking.id,
              requirement: {
                facility_name: add_requirement_facility.facility_name,
                purchase_price: "",
                free_time: add_requirement_facility.free_time,
                only_weekdays: add_requirement_facility.only_weekdays,
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "add_create responce is 400 without RequirementFacility data" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "facility",
              parkingID: parking.id,
              requirement: {
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "add RequirementFree" do
        it "add_create responce is 200 with fulldata" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "free",
              parkingID: parking.id,
              requirement: {
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: add_requirement_free.only_weekdays,
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "add_create responce is 400 without RequirementFree data" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "free",
              parkingID: parking.id,
              requirement: {
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "add RequirementTime" do
        it "add_create responce is 200 with fulldata" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "time",
              parkingID: parking.id,
              requirement: {
                facility_name: "",
                purchase_price: "",
                free_time: add_requirement_time.free_time,
                only_weekdays: add_requirement_time.only_weekdays,
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "add_create responce is 400 without RequirementTime data" do
          post dokotomeyo_add_create_path, params: {
            add_requirement: {
              requirement_type: "time",
              parkingID: parking.id,
              requirement: {
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              }
            }
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end
    end
  end
end
