RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_requirement_free" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_requirement_free) { create(:requirement_free, parking_id: existing_parking.id) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "RequirementFree is deleted" do
        delete dokotomeyo_admin_requirementFree_path, params: {
          ID: existing_requirement_free.id,
        }

        expect(RequirementFree.count).to eq 0
      end
    end
  end
end
