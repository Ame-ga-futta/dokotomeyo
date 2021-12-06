RSpec.describe "post", type: :request do
  describe "POST" do
    describe "current_user is nil" do
      context "signup" do
        it "signup response is 200" do
          new_user = FactoryBot.build(:user, name: "new_user", email: "new_user@gmail.com")
          post dokotomeyo_signup_path, params: { user: { name: new_user.name, email: new_user.email, password: "password", password_confirmation: "password" } }
          expect(JSON.parse(response.body)["status"]).to eq 200
          expect(session[:user_id]).not_to be nil
        end

        it "signup response is 400" do
          existing_user = FactoryBot.create(:user, name: "existing_user", email: "existing_user@gmail.com")
          post dokotomeyo_signup_path, params: { user: { name: existing_user.name, email: existing_user.email, password: "password", password_confirmation: "password" } }
          expect(JSON.parse(response.body)["status"]).to eq 400
          expect(session[:user_id]).to be nil
        end
      end

      context "login" do
        it "login response is 200" do
          existing_user = FactoryBot.create(:user, name: "existing_user", email: "existing_user@gmail.com")
          post dokotomeyo_login_path, params: { user: { email: existing_user.email, password: "password" } }
          expect(JSON.parse(response.body)["status"]).to eq 200
          expect(session[:user_id]).not_to be nil
        end

        it "login response is 400" do
          new_user = FactoryBot.build(:user, name: "new_user", email: "new_user@gmail.com")
          post dokotomeyo_login_path, params: { user: { email: new_user.email, password: "password" } }
          expect(JSON.parse(response.body)["status"]).to eq 400
          expect(session[:user_id]).to be nil
        end
      end

      context "logout" do
        it "logout response is 401" do
          delete dokotomeyo_logout_path
          expect(JSON.parse(response.body)["status"]).to eq 401
        end
      end
    end

    describe "current_user exists" do
      before do
        current_user = FactoryBot.create(:user, name: "current_user", email: "current_user@gmail.com")
        post dokotomeyo_login_path, params: { user: { email: current_user.email, password: "password" } }
      end

      context "signup" do
        it "signup response is 401" do
          new_user = FactoryBot.build(:user, name: "new_user", email: "new_user@gmail.com")
          post dokotomeyo_signup_path, params: { user: { name: new_user.name, email: new_user.email, password: "password", password_confirmation: "password" } }
          expect(JSON.parse(response.body)["status"]).to eq 401
        end
      end

      context "login" do
        it "login response is 401" do
          existing_user = FactoryBot.create(:user, name: "existing_user", email: "existing_user@gmail.com")
          post dokotomeyo_login_path, params: { user: { email: existing_user.email, password: "password" } }
          expect(JSON.parse(response.body)["status"]).to eq 401
        end
      end

      context "logout" do
        it "logout response is 200" do
          delete dokotomeyo_logout_path
          expect(JSON.parse(response.body)["status"]).to eq 200
          expect(session[:user_id]).to be nil
        end
      end
    end
  end
end
