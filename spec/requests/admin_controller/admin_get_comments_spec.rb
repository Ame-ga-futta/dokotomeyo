RSpec.describe "admin", type: :request do
  describe "GET" do
    context "get_comments" do
      context "responce" do
        let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
        let!(:existing_user) { create(:user) }
        let!(:existing_parking) { create(:parking) }
        let!(:existing_comment) { create(:comment, parking_id: existing_parking.id, user_id: existing_user.id) }

        before do
          post dokotomeyo_login_path, params: {
            user: { email: admin_user.email, password: "password" },
          }
        end

        it "get_comments responce is 200 with exist data" do
          get dokotomeyo_admin_comment_path, params: {
            select: 1,
            input: existing_comment.id
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "get_comments responce is 400 with not exist data" do
          get dokotomeyo_admin_comment_path, params: {
            select: 1,
            input: 9
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "filtering" do
        let!(:admin_user) { create(:user, id: 999, admin: true, email: "admin@gmail.com") }
        let!(:user_1) { create(:user, id: 1, name: "AAA-1", email: "1234@gmail.com") }
        let!(:user_2) { create(:user, id: 2, name: "AAA-2", email: "5678@gmail.com") }
        let!(:parking_1) { create(:parking, id: 1, name: "BBB-1", address: "1234-west") }
        let!(:parking_2) { create(:parking, id: 2, name: "BBB-2", address: "5678-west") }
        let!(:comment_1) do
          create(
            :comment,
            id: 1,
            parking_id: parking_1.id,
            user_id: user_1.id,
            comment: "あああ",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:comment_2) do
          create(
            :comment,
            id: 2,
            parking_id: parking_1.id,
            user_id: user_2.id,
            comment: "いいい",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:comment_3) do
          create(
            :comment,
            id: 3,
            parking_id: parking_2.id,
            user_id: user_1.id,
            comment: "ううう",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:comment_4) do
          create(
            :comment,
            id: 4,
            parking_id: parking_2.id,
            user_id: user_2.id,
            comment: "えええ",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:comment_5) do
          create(
            :comment,
            id: 5,
            parking_id: parking_2.id,
            user_id: user_2.id,
            comment: "111",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end

        before do
          post dokotomeyo_login_path, params: {
            user: { email: admin_user.email, password: "password" },
          }
        end

        it "filtering id" do
          get dokotomeyo_admin_comment_path, params: {
            select: 1,
            input: 1
          }

          expect(JSON.parse(response.body)["comments"]).to include(comment_1.attributes)
          expect(JSON.parse(response.body)["comments"]).not_to include(comment_2.attributes, comment_3.attributes, comment_4.attributes, comment_5.attributes)
        end

        it "filtering parking_id" do
          get dokotomeyo_admin_comment_path, params: {
            select: 2,
            input: 1
          }

          expect(JSON.parse(response.body)["comments"]).to include(comment_1.attributes, comment_2.attributes)
          expect(JSON.parse(response.body)["comments"]).not_to include(comment_3.attributes, comment_4.attributes, comment_5.attributes)
        end

        it "filtering user_id" do
          get dokotomeyo_admin_comment_path, params: {
            select: 3,
            input: 1
          }

          expect(JSON.parse(response.body)["comments"]).to include(comment_1.attributes, comment_3.attributes)
          expect(JSON.parse(response.body)["comments"]).not_to include(comment_2.attributes, comment_4.attributes, comment_5.attributes)
        end

        it "filtering free word" do
          get dokotomeyo_admin_comment_path, params: {
            select: 4,
            input: "1"
          }

          expect(JSON.parse(response.body)["comments"]).to include(comment_1.attributes, comment_2.attributes, comment_3.attributes, comment_5.attributes)
          expect(JSON.parse(response.body)["comments"]).not_to include(comment_4.attributes)
        end
      end
    end
  end
end
