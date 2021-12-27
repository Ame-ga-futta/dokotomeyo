RSpec.describe RequirementTime, type: :model do
  describe "validate RequirementTime" do
    let!(:new_parking) { create(:parking, id: 1) }

    context "with free_time, only_weekdays" do
      it "is valid with full data" do
        expect(build(:requirement_time)).to be_valid
      end
    end

    context "without free_time" do
      it "is invalid without free_time" do
        expect(build(:requirement_time, free_time: "")).not_to be_valid
      end
    end

    context "without only_weekdays" do
      it "is invalid without only_weekdays" do
        expect(build(:requirement_time, only_weekdays: "")).not_to be_valid
      end
    end
  end
end
