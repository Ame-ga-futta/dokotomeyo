RSpec.describe "Favorites", type: :request do
  describe "GET" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }
    let!(:existing_parking) { create(:parking) }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "favorite_from_user" do
      it "get_favorite_from_user responce is 200" do
        get dokotomeyo_favorite_from_user_path
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end

    context "favorite_from_parking" do
      it "get_favorite_from_parking responce is 200" do
        get dokotomeyo_favorite_from_parking_path, params: {
          parkingID: existing_parking.id,
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end

    context "get_favorite_match" do
      context "existing_user has favorite" do
        let!(:favorite) { create(:favorite, user_id: existing_user.id, parking_id: existing_parking.id) }

        it "get_favorite_match responce is true" do
          get dokotomeyo_favorite_match_path, params: {
            parkingID: existing_parking.id,
          }
          expect(JSON.parse(response.body)["favorite"]).to eq true
        end
      end

      context "existing_user do not have favorite" do
        it "get_favorite_match responce is false" do
          get dokotomeyo_favorite_match_path, params: {
            parkingID: existing_parking.id,
          }
          expect(JSON.parse(response.body)["favorite"]).to eq false
        end
      end
    end

    context "post_favorite" do
      context "existing_user has favorite" do
        let!(:favorite) { create(:favorite, user_id: existing_user.id, parking_id: existing_parking.id) }

        it "post_favorite responce is false" do
          post dokotomeyo_post_favorite_path, params: {
            parkingID: existing_parking.id,
          }
          expect(JSON.parse(response.body)["favorite"]).to eq false
        end
      end

      context "existing_user do not have favorite" do
        it "post_favorite responce is true" do
          post dokotomeyo_post_favorite_path, params: {
            parkingID: existing_parking.id,
          }
          expect(JSON.parse(response.body)["favorite"]).to eq true
        end
      end
    end
  end

  describe "DELETE" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }
    let!(:existing_parking) { create(:parking) }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }
    let!(:existing_favorite) { create(:favorite, parking_id: existing_parking.id, user_id: existing_user.id) }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "delete_favorite" do
      it "delete_favorite responce is 200" do
        delete dokotomeyo_delete_favorite_path, params: {
          favoriteID: existing_favorite.id,
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end
end
