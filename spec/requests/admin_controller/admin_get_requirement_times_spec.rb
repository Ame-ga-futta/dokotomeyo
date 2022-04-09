RSpec.describe "admin", type: :request do
  describe "GET" do
    context "get_requirement_times" do
      context "responce" do
        let!(:existing_parking) { create(:parking) }
        let!(:existing_requirement_time) { create(:requirement_time, parking_id: existing_parking.id) }

        it "get_requirement_times responce is 200 with exist data" do
          get dokotomeyo_admin_requirementTime_path, params: {
            select: 1,
            input: existing_requirement_time.id
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "get_requirement_times responce is 400 with not exist data" do
          get dokotomeyo_admin_requirementTime_path, params: {
            select: 1,
            input: 9
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "filtering" do
        let!(:parking_1) { create(:parking, id: 1, name: "AAA-1", address: "1234-west") }
        let!(:parking_2) { create(:parking, id: 2, name: "AAA-2", address: "1234-east") }
        let!(:parking_3) { create(:parking, id: 3, name: "BBB-1", address: "5678-west") }
        let!(:parking_4) { create(:parking, id: 4, name: "BBB-2", address: "5678-east") }
        let!(:requirement_1) do
          create(
            :requirement_time,
            id: 1,
            parking_id: parking_1.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:requirement_2) do
          create(
            :requirement_time,
            id: 2,
            parking_id: parking_2.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:requirement_3) do
          create(
            :requirement_time,
            id: 3,
            parking_id: parking_3.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:requirement_4) do
          create(
            :requirement_time,
            id: 4,
            parking_id: parking_4.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:requirement_5) do
          create(
            :requirement_time,
            id: 5,
            parking_id: parking_2.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end

        it "filtering id" do
          get dokotomeyo_admin_requirementTime_path, params: {
            select: 1,
            input: 1
          }

          expect(JSON.parse(response.body)["requirements"]).to match(requirement_1.attributes)
        end

        it "filtering parking_id" do
          get dokotomeyo_admin_requirementTime_path, params: {
            select: 2,
            input: 2
          }

          expect(JSON.parse(response.body)["requirements"]).to include(requirement_2.attributes, requirement_5.attributes)
          expect(JSON.parse(response.body)["requirements"]).not_to include(requirement_1.attributes, requirement_3.attributes, requirement_4.attributes)
        end

        it "filtering free word" do
          get dokotomeyo_admin_requirementTime_path, params: {
            select: 3,
            input: "2"
          }

          expect(JSON.parse(response.body)["requirements"]).to include(requirement_1.attributes, requirement_2.attributes, requirement_4.attributes, requirement_5.attributes)
          expect(JSON.parse(response.body)["requirements"]).not_to include(requirement_3.attributes)
        end
      end
    end
  end
end
