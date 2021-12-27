RSpec.describe RequirementFree, type: :model do
  describe "validate RequirementFree" do
    let!(:new_parking) { create(:parking, id: 1) }

    context "with only_weekdays" do
      it "is valid with full data" do
        expect(build(:requirement_free)).to be_valid
      end
    end

    context "without only_weekdays" do
      it "is invalid without only_weekdays" do
        expect(build(:requirement_free, only_weekdays: "")).not_to be_valid
      end
    end
  end
end
