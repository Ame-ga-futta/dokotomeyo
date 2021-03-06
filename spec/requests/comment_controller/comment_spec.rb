RSpec.describe "Comments", type: :request do
  describe "GET" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }
    let!(:existing_parking) { create(:parking) }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }

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

    context "comment_from_parking" do
      it "get_comment_from_parking responce is 200" do
        get dokotomeyo_comment_from_parking_path, params: {
          parkingID: existing_parking.id,
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end

  describe "POST" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }
    let!(:existing_parking) { create(:parking) }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "post_comment" do
      it "post_comment responce is 200 with comment" do
        post dokotomeyo_post_comment_path, params: {
          post_comment: {
            parking_id: existing_parking.id,
            comment: "comment",
          },
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end

      it "post_comment responce is 400 without comment" do
        post dokotomeyo_post_comment_path, params: {
          post_comment: {
            parking_id: existing_parking.id,
            comment: "",
          },
        }
        expect(JSON.parse(response.body)["status"]).to eq 400
      end
    end
  end

  describe "DELETE" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }
    let!(:existing_parking) { create(:parking) }
    let!(:existing_requirement) { create(:requirement_buy, parking_id: existing_parking.id) }
    let!(:existing_comment) { create(:comment, parking_id: existing_parking.id, user_id: existing_user.id) }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "delete_comment" do
      it "delete_comment responce is 200" do
        delete dokotomeyo_delete_comment_path, params: {
          commentID: existing_comment.id,
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end
  end
end
