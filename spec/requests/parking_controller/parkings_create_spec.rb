RSpec.describe "Parkings", type: :request do
  describe "POST" do
    let(:new_parking) { build(:parking) }
    let(:new_requirement_buy) { build(:requirement_buy) }
    let(:new_requirement_facility) { build(:requirement_facility) }
    let(:new_requirement_free) { build(:requirement_free) }
    let(:new_requirement_time) { build(:requirement_time) }

    context "create" do
      context "with RequirementBuy" do
        it "create responce is 200 with fulldata" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "buy",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: new_requirement_buy.parking_id,
                facility_name: new_requirement_buy.facility_name,
                purchase_price: new_requirement_buy.purchase_price,
                free_time: new_requirement_buy.free_time,
                only_weekdays: new_requirement_buy.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "create responce is 400 without Parking data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "buy",
              parking: {
                name: "",
                address: "",
                latitude: "",
                longitude: "",
                beginning_of_worktime: "",
                end_of_worktime: "",
              },
              requirement: {
                parking_id: new_requirement_buy.parking_id,
                facility_name: new_requirement_buy.facility_name,
                purchase_price: new_requirement_buy.purchase_price,
                free_time: new_requirement_buy.free_time,
                only_weekdays: new_requirement_buy.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "create responce is 400 without RequirementBuy data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "buy",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: "",
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "with RequirementFacility" do
        it "create responce is 200 with fulldata" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "facility",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: new_requirement_facility.parking_id,
                facility_name: new_requirement_facility.facility_name,
                purchase_price: "",
                free_time: new_requirement_facility.free_time,
                only_weekdays: new_requirement_facility.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "create responce is 400 without Parking data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "facility",
              parking: {
                name: "",
                address: "",
                latitude: "",
                longitude: "",
                beginning_of_worktime: "",
                end_of_worktime: "",
              },
              requirement: {
                parking_id: new_requirement_facility.parking_id,
                facility_name: new_requirement_facility.facility_name,
                purchase_price: "",
                free_time: new_requirement_facility.free_time,
                only_weekdays: new_requirement_facility.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "create responce is 400 without RequirementFacility data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "facility",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: "",
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "with RequirementFree" do
        it "create responce is 200 with fulldata" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "free",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: new_requirement_free,
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: new_requirement_free.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "create responce is 400 without Parking data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "free",
              parking: {
                name: "",
                address: "",
                latitude: "",
                longitude: "",
                beginning_of_worktime: "",
                end_of_worktime: "",
              },
              requirement: {
                parking_id: new_requirement_free,
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: new_requirement_free.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "create responce is 400 without RequirementFree data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "free",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: "",
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "with RequirementTime" do
        it "create responce is 200 with fulldata" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "time",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: new_requirement_time.parking_id,
                facility_name: "",
                purchase_price: "",
                free_time: new_requirement_time.free_time,
                only_weekdays: new_requirement_time.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "create responce is 400 without Parking data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "time",
              parking: {
                name: "",
                address: "",
                latitude: "",
                longitude: "",
                beginning_of_worktime: "",
                end_of_worktime: "",
              },
              requirement: {
                parking_id: new_requirement_time.parking_id,
                facility_name: "",
                purchase_price: "",
                free_time: new_requirement_time.free_time,
                only_weekdays: new_requirement_time.only_weekdays,
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "create responce is 400 without RequirementTime data" do
          post dokotomeyo_new_create_path, params: {
            post_parking: {
              requirement_type: "time",
              parking: {
                name: new_parking.name,
                address: new_parking.address,
                latitude: new_parking.latitude,
                longitude: new_parking.longitude,
                beginning_of_worktime: new_parking.beginning_of_worktime,
                end_of_worktime: new_parking.end_of_worktime,
              },
              requirement: {
                parking_id: "",
                facility_name: "",
                purchase_price: "",
                free_time: "",
                only_weekdays: "",
              },
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end
    end
  end
end
