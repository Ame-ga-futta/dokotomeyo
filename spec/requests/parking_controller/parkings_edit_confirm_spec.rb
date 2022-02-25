RSpec.describe "Parkings", type: :request do
  describe "POST" do
    let!(:existing_parking) { create(:parking) }
    let!(:existing_requirement_buy) { create(:requirement_buy, parking_id: existing_parking.id) }
    let!(:existing_requirement_facility) { create(:requirement_facility, parking_id: existing_parking.id) }
    let!(:existing_requirement_free) { create(:requirement_free, parking_id: existing_parking.id) }
    let!(:existing_requirement_time) { create(:requirement_time, parking_id: existing_parking.id) }
    let(:edit_parking) { build(:parking, name: "edited") }
    let(:edit_requirement_buy) { build(:requirement_buy, facility_name: "edited") }
    let(:edit_requirement_facility) { build(:requirement_facility, facility_name: "edited") }
    let(:edit_requirement_free) { build(:requirement_free, only_weekdays: true) }
    let(:edit_requirement_time) { build(:requirement_time, free_time: "01:00") }

    context "edit_confilm" do
      context "edit parking" do
        it "edit_confilm responce is 200 with parking data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: edit_parking.name,
                address: edit_parking.address,
                latitude: edit_parking.latitude,
                longitude: edit_parking.longitude,
                beginning_of_worktime: edit_parking.beginning_of_worktime,
                end_of_worktime: edit_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "edit_confilm responce is 400 without parking data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: "",
                address: "",
                latitude: "",
                longitude: "",
                beginning_of_worktime: "",
                end_of_worktime: ""
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "edit_confilm responce is 200 when delete all requirement" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "edit Requirement_buy" do
        it "edit_confilm responce is 200 with Requirement_buy data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: edit_requirement_buy
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "edit_confilm responce is 400 without Requirement_buy data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {}
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "edit_confilm responce is 200 when delete Requirement_buy" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end
      end

      context "edit requirement_facility" do
        it "edit_confilm responce is 200 with requirement_facility data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: edit_requirement_facility
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "edit_confilm responce is 400 without requirement_facility data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {}
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "edit_confilm responce is 200 when delete requirement_facility" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end
      end

      context "edit requirement_free" do
        it "edit_confilm responce is 200 with requirement_free data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: edit_requirement_free
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "edit_confilm responce is 400 without requirement_free data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {}
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "edit_confilm responce is 200 when delete requirement_free" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end
      end

      context "edit requirement_time" do
        it "edit_confilm responce is 200 with requirement_time data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: edit_requirement_time
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "edit_confilm responce is 400 without requirement_time data" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: false,
                  requirements: {}
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end

        it "edit_confilm responce is 200 when delete requirement_time" do
          post dokotomeyo_edit_confirm_path, params: {
            edit_parking_detail: {
              parking: {
                id: existing_parking.id,
                name: existing_parking.name,
                address: existing_parking.address,
                latitude: existing_parking.latitude,
                longitude: existing_parking.longitude,
                beginning_of_worktime: existing_parking.beginning_of_worktime,
                end_of_worktime: existing_parking.end_of_worktime
              },
              requirement_buy: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_buy.facility_name,
                    purchase_price: existing_requirement_buy.purchase_price,
                    free_time: existing_requirement_buy.free_time,
                    only_weekdays: existing_requirement_buy.only_weekdays
                  }
                }
              },
              requirement_facility: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: existing_requirement_facility.facility_name,
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_free: {
                1 => {
                  delete: false,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: "",
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              },
              requirement_time: {
                1 => {
                  delete: true,
                  requirements: {
                    facility_name: "",
                    purchase_price: "",
                    free_time: existing_requirement_facility.free_time,
                    only_weekdays: existing_requirement_facility.only_weekdays
                  }
                }
              }
            }
          }.to_json, headers: { "Content-Type" => "application/json" }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end
      end
    end
  end
end
