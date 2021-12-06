RSpec.describe User, type: :model do
  describe "validate User" do
    context "with username, email and password" do
      new_user = FactoryBot.build(:user)

      it "is valid with username, email and password" do
        expect(new_user).to be_valid
      end
    end

    context "without Username" do
      new_user = FactoryBot.build(:user, name: "")

      it "is invalid without Username" do
        expect(new_user).not_to be_valid
      end
    end

    context "without email" do
      new_user = FactoryBot.build(:user, email: "")

      it "is invalid without email" do
        expect(new_user).not_to be_valid
      end
    end

    context "without password" do
      new_user = FactoryBot.build(:user, password: "")

      it "is invalid without password" do
        expect(new_user).not_to be_valid
      end
    end

    context "the length of password is not over 8" do
      context "the length of password is 7" do
        new_user = FactoryBot.build(:user, password: "7777777")

        it "is invalid when the length of password is 7" do
          expect(new_user).not_to be_valid
        end
      end

      context "the length of password is 8" do
        new_user = FactoryBot.build(:user, password: "88888888")

        it "is valid when the length of password is 8" do
          expect(new_user).to be_valid
        end
      end
    end

    context "the length of name is over 20" do
      context "the length of name is 20" do
        new_user = FactoryBot.build(:user, name: "new_userrrrrrrrrrrrr")

        it "is invalid when the length of name is 20" do
          expect(new_user).to be_valid
        end
      end

      context "the length of name is 21" do
        new_user = FactoryBot.build(:user, name: "new_userrrrrrrrrrrrrr")

        it "is invalid when the length of name is 21" do
          expect(new_user).not_to be_valid
        end
      end
    end

    context "email is duplicated" do
      it "is invalid if email is duplicated" do
        existing_user = FactoryBot.create(:user, name: "existing_user", email: "existing_user@gmail.com")
        new_user = FactoryBot.build(:user, name: "new_user", email: "existing_user@gmail.com")

        expect(existing_user).to be_valid
        expect(new_user).not_to be_valid
      end
    end
  end
end
