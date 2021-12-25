RSpec.describe RequirementFacility, type: :model do
  describe "validate RequirementFacility" do
    let!(:new_parking) { create(:parking, id: 1) }

    context "with facility_name, free_time, only_weekdays" do
      it "is valid with full data" do
        expect(build(:requirement_facility)).to be_valid
      end
    end

    context "without facility_name" do
      it "is invalid without facility_name" do
        expect(build(:requirement_facility, facility_name: "")).not_to be_valid
      end
    end

    context "without free_time" do
      it "is invalid without free_time" do
        expect(build(:requirement_facility, free_time: "")).not_to be_valid
      end
    end

    context "without only_weekdays" do
      it "is invalid without only_weekdays" do
        expect(build(:requirement_facility, only_weekdays: "")).not_to be_valid
      end
    end
  end
end
