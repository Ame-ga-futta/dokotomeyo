RSpec.describe "Parkings", type: :request do
  describe "POST" do
    context "search" do
      context "validate" do
        context "without place" do
          it "search responce is 400 without place" do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "2022-01-01 20:00:00",
                  include_time: true,
                  include_buy: true,
                  include_facility: true,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
            expect(JSON.parse(response.body)["status"]).to eq 400
          end
        end

        context "without start_time" do
          it "search responce is 400 without start_time" do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "",
                  end_date: "2022-01-01 20:00:00",
                  include_time: true,
                  include_buy: true,
                  include_facility: true,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
            expect(JSON.parse(response.body)["status"]).to eq 400
          end
        end

        context "without end_time" do
          it "search responce is 400 without end_time" do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "",
                  include_time: true,
                  include_buy: true,
                  include_facility: true,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
            expect(JSON.parse(response.body)["status"]).to eq 400
          end
        end

        context "same start_time and end_time" do
          it "search responce is 400 when same start_time and end_time" do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "2022-01-01 17:00:00",
                  include_time: true,
                  include_buy: true,
                  include_facility: true,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
            expect(JSON.parse(response.body)["status"]).to eq 400
          end
        end
      end

      context "filtering time" do
        let!(:parking_1) { create(:parking, id: 1, beginning_of_worktime: "08:00:00", end_of_worktime: "22:00:00", created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:parking_2) { create(:parking, id: 2, beginning_of_worktime: "08:00:00", end_of_worktime: "18:00:00", created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_1) { create(:requirement_free, parking_id: parking_1.id) }
        let!(:requirement_2) { create(:requirement_free, parking_id: parking_2.id) }

        before do
          post dokotomeyo_search_path, params: {
            search_parking: {
              mapCenter: {
                lat: 1.5,
                lng: 1.5,
              },
              narrowDown: {
                place: "sample",
                start_date: "2022-01-01 17:00:00",
                end_date: "2022-01-01 20:00:00",
                include_time: true,
                include_buy: true,
                include_facility: true,
              },
            },
          }.to_json, headers: { "Content-Type" => "application/json" }
        end

        it "open parking is displayed" do
          expect(JSON.parse(response.body)["parkings"][0]).to include parking_1.attributes
        end

        it "closed parking is hidden" do
          expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_2.attributes
        end
      end

      context "filtering requirement" do
        let!(:parking_requirementFree) { create(:parking, id: 1, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_free) { create(:requirement_free, parking_id: parking_requirementFree.id) }
        let!(:parking_requirementBuy) { create(:parking, id: 2, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_buy) { create(:requirement_buy, parking_id: parking_requirementBuy.id) }
        let!(:parking_requirementFacility) { create(:parking, id: 3, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_facility) { create(:requirement_facility, parking_id: parking_requirementFacility.id) }
        let!(:parking_requirementTime) { create(:parking, id: 4, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_time) { create(:requirement_time, parking_id: parking_requirementTime.id) }

        context "include all Requirement" do
          it "displayed all parking" do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "2022-01-01 20:00:00",
                  include_time: true,
                  include_buy: true,
                  include_facility: true,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementFree.attributes
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementBuy.attributes
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementFacility.attributes
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementTime.attributes
          end
        end

        context "include RequirementBuy" do
          before do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "2022-01-01 20:00:00",
                  include_time: false,
                  include_buy: true,
                  include_facility: false,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
          end

          it "parking including RequirementBuy is displayed" do
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementFree.attributes
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementBuy.attributes
          end

          it "Parking not including RequirementBuy is hidden" do
            expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_requirementFacility.attributes
            expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_requirementTime.attributes
          end
        end

        context "include RequirementFacility" do
          before do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "2022-01-01 20:00:00",
                  include_time: false,
                  include_buy: false,
                  include_facility: true,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
          end

          it "parking including RequirementFacility is displayed" do
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementFree.attributes
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementFacility.attributes
          end

          it "Parking not including RequirementFacility is hidden" do
            expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_requirementBuy.attributes
            expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_requirementTime.attributes
          end
        end

        context "include RequirementTime" do
          before do
            post dokotomeyo_search_path, params: {
              search_parking: {
                mapCenter: {
                  lat: 1.5,
                  lng: 1.5,
                },
                narrowDown: {
                  place: "sample",
                  start_date: "2022-01-01 17:00:00",
                  end_date: "2022-01-01 20:00:00",
                  include_time: true,
                  include_buy: false,
                  include_facility: false,
                },
              },
            }.to_json, headers: { "Content-Type" => "application/json" }
          end

          it "parking including RequirementTime is displayed" do
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementFree.attributes
            expect(JSON.parse(response.body)["parkings"][0]).to include parking_requirementTime.attributes
          end

          it "Parking not including RequirementTime is hidden" do
            expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_requirementBuy.attributes
            expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_requirementFacility.attributes
          end
        end
      end

      context "filtering bounds" do
        let!(:parking_in_bounds) { create(:parking, id: 1, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:parking_out_bounds) { create(:parking, id: 2, latitude: 2.0, longitude: 2.0, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_1) { create(:requirement_free, parking_id: parking_in_bounds.id) }
        let!(:requirement_2) { create(:requirement_free, parking_id: parking_out_bounds.id) }

        before do
          post dokotomeyo_search_path, params: {
            search_parking: {
              mapCenter: {
                lat: 1.5,
                lng: 1.5,
              },
              narrowDown: {
                place: "sample",
                start_date: "2022-01-01 17:00:00",
                end_date: "2022-01-01 20:00:00",
                include_time: true,
                include_buy: true,
                include_facility: true,
              },
            },
          }.to_json, headers: { "Content-Type" => "application/json" }
        end

        it "parking_in_bounds is displayed" do
          expect(JSON.parse(response.body)["parkings"][0]).to include parking_in_bounds.attributes
        end

        it "parking_out_bounds is hidden" do
          expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_out_bounds.attributes
        end
      end

      context "filtering weekday_check" do
        let!(:parking_allday) { create(:parking, id: 1, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:parking_weekday) { create(:parking, id: 2, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_1) { create(:requirement_free, parking_id: parking_allday.id, only_weekdays: false) }
        let!(:requirement_2) { create(:requirement_free, parking_id: parking_weekday.id, only_weekdays: true) }

        before do
          post dokotomeyo_search_path, params: {
            search_parking: {
              mapCenter: {
                lat: 1.5,
                lng: 1.5,
              },
              narrowDown: {
                place: "sample",
                start_date: "2022-01-01 17:00:00",
                end_date: "2022-01-01 20:00:00",
                include_time: true,
                include_buy: true,
                include_facility: true,
              },
            },
          }.to_json, headers: { "Content-Type" => "application/json" }
        end

        it "parking_allday is displayed" do
          expect(JSON.parse(response.body)["parkings"][0]).to include parking_allday.attributes
        end

        it "parking_weekday is hidden" do
          expect(JSON.parse(response.body)["parkings"][0]).not_to include parking_weekday.attributes
        end
      end

      context "filtering sort" do
        let!(:parking_long) { create(:parking, id: 1, latitude: 1.503, longitude: 1.497, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:parking_mid) { create(:parking, id: 2, latitude: 1.502, longitude: 1.498, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:parking_short) { create(:parking, id: 3, latitude: 1.501, longitude: 1.499, created_at: "2022-01-01T12:00:00.000+09:00", updated_at: "2022-01-01T12:00:00.000+09:00") }
        let!(:requirement_1) { create(:requirement_free, parking_id: parking_long.id) }
        let!(:requirement_2) { create(:requirement_free, parking_id: parking_mid.id) }
        let!(:requirement_3) { create(:requirement_free, parking_id: parking_short.id) }

        before do
          post dokotomeyo_search_path, params: {
            search_parking: {
              mapCenter: {
                lat: 1.5,
                lng: 1.5,
              },
              narrowDown: {
                place: "sample",
                start_date: "2022-01-01 17:00:00",
                end_date: "2022-01-01 20:00:00",
                include_time: true,
                include_buy: true,
                include_facility: true,
              },
            },
          }.to_json, headers: { "Content-Type" => "application/json" }
        end

        it "parkings is sorted by distance" do
          expect(JSON.parse(response.body)["parkings"][0]).to match [parking_short.attributes, parking_mid.attributes, parking_long.attributes]
        end
      end
    end
  end
end
