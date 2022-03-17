RSpec.describe Comment, type: :model do
  describe "validate Comment" do
    let!(:parking) { create(:parking, id: 1) }
    let!(:user) { create(:user, id: 1) }

    context "with parking_id, user_id and comment" do
      it "is valid with parking_id, user_id and comment" do
        expect(build(:comment)).to be_valid
      end
    end

    context "without parking_id" do
      it "is invalid without parking_id" do
        expect(build(:comment, parking_id: "")).not_to be_valid
      end
    end

    context "without user_id" do
      it "is invalid without user_id" do
        expect(build(:comment, user_id: "")).not_to be_valid
      end
    end

    context "without comment" do
      it "is invalid without comment" do
        expect(build(:comment, comment: "")).not_to be_valid
      end
    end

    context "the length of comment is 140" do
      it "is valid when the length of comment is 140" do
        expect(build(:comment, comment: "A" * 140)).to be_valid
      end
    end

    context "the length of comment is 141" do
      it "is invalid when the length of comment is 141" do
        expect(build(:comment, comment: "A" * 141)).not_to be_valid
      end
    end
  end
end
