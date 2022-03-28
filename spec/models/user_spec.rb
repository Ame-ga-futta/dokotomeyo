RSpec.describe User, type: :model do
  describe "validate User" do
    context "with username, email and password" do
      it "is valid with username, email and password" do
        expect(build(:user)).to be_valid
      end
    end

    context "without Username" do
      it "is invalid without Username" do
        expect(build(:user, name: "")).not_to be_valid
      end
    end

    context "without email" do
      it "is invalid without email" do
        expect(build(:user, email: "")).not_to be_valid
      end
    end

    context "without password" do
      it "is invalid without password" do
        expect(build(:user, password: "")).not_to be_valid
      end
    end

    context "the length of password is not over 8" do
      context "the length of password is 7" do
        it "is invalid when the length of password is 7" do
          expect(build(:user, password: "7777777")).not_to be_valid
        end
      end

      context "the length of password is 8" do
        it "is valid when the length of password is 8" do
          expect(build(:user, password: "88888888")).to be_valid
        end
      end
    end

    context "the length of name is over 20" do
      context "the length of name is 20" do
        it "is valid when the length of name is 20" do
          expect(build(:user, name: "new_userrrrrrrrrrrrr")).to be_valid
        end
      end

      context "the length of name is 21" do
        it "is invalid when the length of name is 21" do
          expect(build(:user, name: "new_userrrrrrrrrrrrrr")).not_to be_valid
        end
      end
    end

    context "email is duplicated" do
      it "is invalid if email is duplicated" do
        expect(create(:user, name: "existing_user", email: "existing_user@gmail.com")).to be_valid
        expect(build(:user, name: "new_user", email: "existing_user@gmail.com")).not_to be_valid
      end
    end
  end

  describe "association User" do
    let!(:new_parking) { create(:parking) }
    let!(:new_user) { create(:user) }
    let!(:new_requirement_buy) { create(:requirement_buy, parking_id: new_parking.id) }
    let!(:new_favorite) { create(:favorite, parking_id: new_parking.id, user_id: new_user.id) }
    let!(:new_comment) { create(:comment, parking_id: new_parking.id, user_id: new_user.id) }

    context "when User is deleted" do
      it "favorites is also deleted" do
        expect { new_user.destroy }.to change { Favorite.count }.from(1).to(0)
      end

      it "comments is also deleted" do
        expect { new_user.destroy }.to change { Comment.count }.from(1).to(0)
      end
    end
  end
end
