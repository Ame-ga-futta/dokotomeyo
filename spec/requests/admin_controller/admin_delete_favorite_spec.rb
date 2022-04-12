RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_favorite" do
      let!(:existing_user) { create(:user) }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_favorite) { create(:favorite, parking_id: existing_parking.id, user_id: existing_user.id) }

      it "Favorite is deleted" do
        delete dokotomeyo_admin_favorite_path, params: {
          ID: existing_favorite.id,
        }

        expect(Favorite.count).to eq 0
      end
    end
  end
end
