RSpec.describe Favorite, type: :model do
  describe "validate Favorite" do
    let!(:parking) { create(:parking, id: 1) }
    let!(:user) { create(:user, id: 1) }

    context "with parking_id and user_id" do
      it "is valid with parking_id and user_id" do
        expect(build(:favorite)).to be_valid
      end
    end

    context "without parking_id" do
      it "is invalid without parking_id" do
        expect(build(:favorite, parking_id: "")).not_to be_valid
      end
    end

    context "without user_id" do
      it "is invalid without user_id" do
        expect(build(:favorite, user_id: "")).not_to be_valid
      end
    end

    context "parking_id and user_id match" do
      let!(:existing_favorite) { create(:favorite, parking_id: parking.id, user_id: user.id) }
      let!(:existing_parking) { create(:parking, id: 2) }

      it "is valid when parking_id and user_id match count is 1" do
        expect(build(:favorite, parking_id: 2, user_id: 1)).to be_valid
      end

      it "is invalid when parking_id and user_id match count more than 2" do
        expect(build(:favorite, parking_id: 1, user_id: 1)).not_to be_valid
      end
    end
  end
end
