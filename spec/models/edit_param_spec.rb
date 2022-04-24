RSpec.describe EditParam, type: :model do
  describe "validate EditParam" do
    context "with params" do
      it "is valid with params" do
        expect(build(:edit_param)).to be_valid
      end
    end

    context "without params" do
      it "is invalid without params" do
        expect(build(:edit_param, params: "")).not_to be_valid
      end
    end
  end
end
