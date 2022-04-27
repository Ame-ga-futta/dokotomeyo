RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_comment" do
      let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
      let!(:existing_user) { create(:user) }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_comment) { create(:comment, parking_id: existing_parking.id, user_id: existing_user.id) }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      it "Comment is deleted" do
        delete dokotomeyo_admin_comment_path, params: {
          ID: existing_comment.id,
        }

        expect(Comment.count).to eq 0
      end
    end
  end
end
