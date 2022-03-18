RSpec.describe "Comments", type: :request do
  describe "GET" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "comment_from_user" do
      it "get_comment_from_user responce is 200" do
        get dokotomeyo_comment_from_user_path
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end

  describe "POST" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }
    let!(:existing_parking) { create:parking }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "comment_from_parking" do
      it "get_comment_from_parking responce is 200" do
        post dokotomeyo_comment_from_parking_path, params: {
          parkingID: existing_parking.id
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end
end
