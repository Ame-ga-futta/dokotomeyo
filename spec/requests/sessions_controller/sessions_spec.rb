RSpec.describe "sessions", type: :request do
  describe "POST" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }

    describe "current_user is nil" do
      context "signup" do
        it "signup response is 200" do
          post dokotomeyo_signup_path, params: {
            user: { name: "new_user", email: "new_user@gmail.com", password: "password", password_confirmation: "password" },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
          expect(session[:user_id]).not_to be nil
        end

        it "signup response is 400" do
          post dokotomeyo_signup_path, params: {
            user: { name: existing_user.name, email: existing_user.email, password: "password", password_confirmation: "password" },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
          expect(session[:user_id]).to be nil
        end
      end

      context "login" do
        it "login response is 200" do
          post dokotomeyo_login_path, params: {
            user: { email: existing_user.email, password: "password" },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
          expect(session[:user_id]).not_to be nil
        end

        it "login response is 400" do
          post dokotomeyo_login_path, params: {
            user: { email: "new_user@gmail.com", password: "password" },
          }
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
      let!(:current_user) { create(:user, name: "current_user", email: "current_user@gmail.com") }

      before do
        post dokotomeyo_login_path, params: {
          user: { email: current_user.email, password: "password" },
        }
      end

      context "signup" do
        it "signup response is 401" do
          post dokotomeyo_signup_path, params: {
            user: { name: "new_user", email: "new_user@gmail.com", password: "password", password_confirmation: "password" },
          }
          expect(JSON.parse(response.body)["status"]).to eq 401
        end
      end

      context "login" do
        it "login response is 401" do
          post dokotomeyo_login_path, params: {
            user: { email: existing_user.email, password: "password" },
          }
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
