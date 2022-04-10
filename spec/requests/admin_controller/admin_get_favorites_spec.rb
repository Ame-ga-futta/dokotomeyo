RSpec.describe "admin", type: :request do
  describe "GET" do
    context "get_favorites" do
      context "responce" do
        let!(:existing_user) { create(:user) }
        let!(:existing_parking) { create(:parking) }
        let!(:existing_favorite) { create(:favorite, parking_id: existing_parking.id, user_id: existing_user.id) }

        it "get_favorites responce is 200 with exist data" do
          get dokotomeyo_admin_favorite_path, params: {
            select: 1,
            input: existing_favorite.id
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "get_favorites responce is 400 with not exist data" do
          get dokotomeyo_admin_favorite_path, params: {
            select: 1,
            input: 9
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "filtering" do
        let!(:user_1) { create(:user, id: 1, name: "AAA-1", email: "1234@gmail.com") }
        let!(:user_2) { create(:user, id: 2, name: "AAA-2", email: "5678@gmail.com") }
        let!(:parking_1) { create(:parking, id: 1, name: "BBB-1", address: "1234-west") }
        let!(:parking_2) { create(:parking, id: 2, name: "BBB-2", address: "5678-west") }
        let!(:favorites_1) do
          create(
            :favorite,
            id: 1,
            parking_id: parking_1.id,
            user_id: user_1.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:favorites_2) do
          create(
            :favorite,
            id: 2,
            parking_id: parking_1.id,
            user_id: user_2.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:favorites_3) do
          create(
            :favorite,
            id: 3,
            parking_id: parking_2.id,
            user_id: user_1.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:favorites_4) do
          create(
            :favorite,
            id: 4,
            parking_id: parking_2.id,
            user_id: user_2.id,
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end

        it "filtering id" do
          get dokotomeyo_admin_favorite_path, params: {
            select: 1,
            input: 1
          }

          expect(JSON.parse(response.body)["favorites"]).to include(favorites_1.attributes)
          expect(JSON.parse(response.body)["favorites"]).not_to include(favorites_2.attributes, favorites_3.attributes, favorites_4.attributes)
        end

        it "filtering parking_id" do
          get dokotomeyo_admin_favorite_path, params: {
            select: 2,
            input: 1
          }

          expect(JSON.parse(response.body)["favorites"]).to include(favorites_1.attributes, favorites_2.attributes)
          expect(JSON.parse(response.body)["favorites"]).not_to include(favorites_3.attributes, favorites_4.attributes)
        end

        it "filtering user_id" do
          get dokotomeyo_admin_favorite_path, params: {
            select: 3,
            input: 1
          }

          expect(JSON.parse(response.body)["favorites"]).to include(favorites_1.attributes, favorites_3.attributes)
          expect(JSON.parse(response.body)["favorites"]).not_to include(favorites_2.attributes, favorites_4.attributes)
        end

        it "filtering free word" do
          get dokotomeyo_admin_favorite_path, params: {
            select: 4,
            input: "1"
          }

          expect(JSON.parse(response.body)["favorites"]).to include(favorites_1.attributes, favorites_2.attributes, favorites_3.attributes)
          expect(JSON.parse(response.body)["favorites"]).not_to include(favorites_4.attributes)
        end
      end
    end
  end
end
