RSpec.describe "admin", type: :request do
  describe "DELETE" do
    context "delete_comment" do
      let!(:existing_user) { create(:user) }
      let!(:existing_parking) { create(:parking) }
      let!(:existing_comment) { create(:comment, parking_id: existing_parking.id, user_id: existing_user.id) }

      it "Comment is deleted" do
        delete dokotomeyo_admin_comment_path, params: {
          ID: existing_comment.id,
        }

        expect(Comment.count).to eq 0
      end
    end
  end
end
