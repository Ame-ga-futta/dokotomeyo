RSpec.describe "top", type: :request do
  describe "GET" do
    let!(:existing_user) { create(:user, name: "existing_user", email: "existing_user@gmail.com") }

    before do
      post dokotomeyo_login_path, params: {
        user: { email: existing_user.email, password: "password" },
      }
    end

    context "get_profile" do
      it "get_profile responce is 200" do
        get dokotomeyo_profile_path
        expect(JSON.parse(response.body)["status"]).to eq 200
      end
    end

    context "get_username" do
      it "get_username responce is 200 with userID" do
        get dokotomeyo_username_path, params: {
          userID: existing_user.id,
        }
        expect(JSON.parse(response.body)["status"]).to eq 200
      end

      it "get_username responce is 400 without userID" do
        get dokotomeyo_username_path, params: {
          userID: "",
        }
        expect(JSON.parse(response.body)["status"]).to eq 400
      end
    end
  end

  describe "POST" do
    let!(:admin_user) { create(:user, id: 1, name: "admin_user", email: "admin_user@gmail.com") }
    let!(:guest_user) { create(:user, id: 2, name: "guest_user", email: "guest_user@gmail.com") }
    let!(:existing_user) { create(:user, id: 3, name: "existing_user", email: "existing_user@gmail.com") }

    context "when admin_user" do
      before do
        post dokotomeyo_login_path, params: {
          user: { email: admin_user.email, password: "password" },
        }
      end

      context "update_name" do
        it "update_name responce is 400" do
          post dokotomeyo_update_name_path, params: {
            user: {
              name: "new_name",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "update_email" do
        it "update_email responce is 400" do
          post dokotomeyo_update_email_path, params: {
            user: {
              email: "new_mail@gmail.com",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "update_password" do
        it "update_password responce is 400" do
          post dokotomeyo_update_password_path, params: {
            user: {
              currentPassword: existing_user.password,
              password: "new_password",
              password_confirmation: "new_password",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end
    end

    context "when guest_user" do
      before do
        post dokotomeyo_login_path, params: {
          user: { email: guest_user.email, password: "password" },
        }
      end

      context "update_name" do
        it "update_name responce is 400" do
          post dokotomeyo_update_name_path, params: {
            user: {
              name: "new_name",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "update_email" do
        it "update_email responce is 400" do
          post dokotomeyo_update_email_path, params: {
            user: {
              email: "new_mail@gmail.com",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "update_password" do
        it "update_password responce is 400" do
          post dokotomeyo_update_password_path, params: {
            user: {
              currentPassword: existing_user.password,
              password: "new_password",
              password_confirmation: "new_password",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end
    end

    context "when existing_user" do
      before do
        post dokotomeyo_login_path, params: {
          user: { email: existing_user.email, password: "password" },
        }
      end

      context "update_name" do
        it "update_name responce is 200 with name" do
          post dokotomeyo_update_name_path, params: {
            user: {
              name: "new_name",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "update_name responce is 400 without name" do
          post dokotomeyo_update_name_path, params: {
            user: {
              name: "",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "update_email" do
        it "update_email responce is 200 with email" do
          post dokotomeyo_update_email_path, params: {
            user: {
              email: "new_mail@gmail.com",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "update_email responce is 400 without email" do
          post dokotomeyo_update_email_path, params: {
            user: {
              email: "",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end

      context "update_password" do
        it "update_password responce is 200" do
          post dokotomeyo_update_password_path, params: {
            user: {
              currentPassword: existing_user.password,
              password: "new_password",
              password_confirmation: "new_password",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 200
        end

        it "update_password is 400" do
          post dokotomeyo_update_password_path, params: {
            user: {
              currentPassword: existing_user.password,
              password: "new_password",
              password_confirmation: "new_passwordddd",
            },
          }
          expect(JSON.parse(response.body)["status"]).to eq 400
        end
      end
    end
  end
end
