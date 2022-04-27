RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_buy" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_buy) { create(:requirement_buy, parking_id: existing_parking.id) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "RequirementBuy is deleted" do
        delete dokotomeyo_admin_requirementBuy_path, params: {
          ID: existing_requirement_buy.id,
        }

        expect(RequirementBuy.count).to eq 0
      end
    end
  end
end
