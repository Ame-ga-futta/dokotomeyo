RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_parking" do
      let!(:existing_parking) { create(:parking) }

      it "Parking is deleted" do
        delete dokotomeyo_admin_parking_path, params: {
          ID: existing_parking.id,
        }

        expect(Parking.count).to eq 0
      end
    end
  end
end
