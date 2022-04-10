RSpec.describe "admin", type: :request do
  describe "GET" do
    context "get_users" do
      context "responce" do
        let!(:existing_user) { create(:user) }

        it "get_users responce is 200 with exist data" do
          get dokotomeyo_admin_user_path, params: {
            select: 1,
            input: existing_user.id
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "get_users responce is 400 with not exist data" do
          get dokotomeyo_admin_user_path, params: {
            select: 1,
            input: 9
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "filtering" do
        let!(:user_1) do
          create(
            :user,
            id: 1,
            name: "AAA-1",
            email: "1234@gmail.com",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:user_2) do
          create(
            :user,
            id: 2,
            name: "AAA-2",
            email: "1234@icloud.com",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:user_3) do
          create(
            :user,
            id: 3,
            name: "BBB-1",
            email: "5678@gmail.com",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end
        let!(:user_4) do
          create(
            :user,
            id: 4,
            name: "BBB-2",
            email: "5678@icloud.com",
            created_at: "2022-01-01T12:00:00.000+09:00",
            updated_at: "2022-01-01T12:00:00.000+09:00",
          )
        end

        it "filtering id" do
          get dokotomeyo_admin_user_path, params: {
            select: 1,
            input: 1
          }

          expect(JSON.parse(response.body)["users"]).to include(user_1.attributes)
          expect(JSON.parse(response.body)["users"]).not_to include(user_2.attributes, user_3.attributes, user_4.attributes)
        end

        it "filtering name" do
          get dokotomeyo_admin_user_path, params: {
            select: 2,
            input: "AAA"
          }

          expect(JSON.parse(response.body)["users"]).to include(user_1.attributes, user_2.attributes)
          expect(JSON.parse(response.body)["users"]).not_to include(user_3.attributes, user_4.attributes)
        end

        it "filtering email" do
          get dokotomeyo_admin_user_path, params: {
            select: 3,
            input: "gmail.com"
          }

          expect(JSON.parse(response.body)["users"]).to include(user_1.attributes, user_3.attributes)
          expect(JSON.parse(response.body)["users"]).not_to include(user_2.attributes, user_4.attributes)
        end

        it "filtering free word" do
          get dokotomeyo_admin_user_path, params: {
            select: 4,
            input: "2"
          }

          expect(JSON.parse(response.body)["users"]).to include(user_1.attributes, user_2.attributes, user_4.attributes)
          expect(JSON.parse(response.body)["users"]).not_to include(user_3.attributes)
        end
      end
    end
  end
end
