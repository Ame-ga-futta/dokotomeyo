RSpec.describe User, type: :model do
  describe "validate User" do
    let(:new_user) { User.new(params) }

    context "with username, email and password" do
      let(:params) { { name: "new_user", email: "new_user@gmail.com", password: "password" } }

      it "is valid with username, email and password" do
        expect(new_user).to be_valid
      end
    end

    context "without Username" do
      let(:params) { { name: "", email: "new_user@gmail.com", password: "password" } }

      it "is invalid without Username" do
        expect(new_user).not_to be_valid
      end
    end

    context "without email" do
      let(:params) { { name: "new_user", email: "", password: "password" } }

      it "is invalid without email" do
        expect(new_user).not_to be_valid
      end
    end

    context "without password" do
      let(:params) { { name: "new_user", email: "new_user@gmail.com", password: "" } }

      it "is invalid without password" do
        expect(new_user).not_to be_valid
      end
    end

    context "the length of password is not over 8" do
      context "the length of password is 7" do
        let(:params) { { name: "new_user", email: "new_user@gmail.com", password: "passwor" } }

        it "is invalid when the length of password is 7" do
          expect(new_user).not_to be_valid
        end
      end

      context "the length of password is 8" do
        let(:params) { { name: "new_user", email: "new_user@gmail.com", password: "password" } }

        it "is valid when the length of password is 8" do
          expect(new_user).to be_valid
        end
      end
    end

    context "the length of name is over 20" do
      context "the length of name is 20" do
        let(:params) { { name: "new_userrrrrrrrrrrrr", email: "new_user@gmail.com", password: "password" } }

        it "is invalid when the length of name is 20" do
          expect(new_user).to be_valid
        end
      end

      context "the length of name is 21" do
        let(:params) { { name: "new_userrrrrrrrrrrrrr", email: "new_user@gmail.com", password: "password" } }

        it "is invalid when the length of name is 21" do
          expect(new_user).not_to be_valid
        end
      end
    end

    context "email is duplicated" do
      User.create(
        name: "existing_user",
        email: "existing_user@gmail.com",
        password: "password"
      )
      let(:params) { { name: "new_user", email: "existing_user@gmail.com", password: "password" } }

      it "is invalid if email is duplicated" do
        expect(new_user).not_to be_valid
      end
    end
  end
end
