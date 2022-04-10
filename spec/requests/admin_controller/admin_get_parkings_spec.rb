RSpec.describe "admin", type: :request do
  describe "GET" do
    context "get_parkings" do
      context "responce" do
        let!(:existing_parking) { create(:parking) }

        it "get_parkings responce is 200 with exist data" do
          get dokotomeyo_admin_parking_path, params: {
            select: 1,
            input: existing_parking.id
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "get_parkings responce is 400 with not exist data" do
          get dokotomeyo_admin_parking_path, params: {
            select: 1,
            input: 9
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "filtering" do
        let!(:parking_1) do
          create(
            :parking,
            id: 1,
            name: "AAA-1",
            address: "1234-west",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:parking_2) do
          create(
            :parking,
            id: 2,
            name: "AAA-2",
            address: "1234-east",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:parking_3) do
          create(
            :parking,
            id: 3,
            name: "BBB-1",
            address: "5678-west",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:parking_4) do
          create(
            :parking,
            id: 4,
            name: "BBB-2",
            address: "5678-east",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end

        it "filtering id" do
          get dokotomeyo_admin_parking_path, params: {
            select: 1,
            input: 1
          }

          expect(JSON.parse(response.body)["parkings"]).to include(parking_1.attributes)
          expect(JSON.parse(response.body)["parkings"]).not_to include(parking_2.attributes, parking_3.attributes, parking_4.attributes)
        end

        it "filtering name" do
          get dokotomeyo_admin_parking_path, params: {
            select: 2,
            input: "AAA"
          }

          expect(JSON.parse(response.body)["parkings"]).to include(parking_1.attributes, parking_2.attributes)
          expect(JSON.parse(response.body)["parkings"]).not_to include(parking_3.attributes, parking_4.attributes)
        end

        it "filtering address" do
          get dokotomeyo_admin_parking_path, params: {
            select: 3,
            input: "west"
          }

          expect(JSON.parse(response.body)["parkings"]).to include(parking_1.attributes, parking_3.attributes)
          expect(JSON.parse(response.body)["parkings"]).not_to include(parking_2.attributes, parking_4.attributes)
        end

        it "filtering free word" do
          get dokotomeyo_admin_parking_path, params: {
            select: 4,
            input: "2"
          }

          expect(JSON.parse(response.body)["parkings"]).to include(parking_1.attributes, parking_2.attributes, parking_4.attributes)
          expect(JSON.parse(response.body)["parkings"]).not_to include(parking_3.attributes)
        end
      end
    end
  end
end
