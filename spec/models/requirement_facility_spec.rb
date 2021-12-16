RSpec.describe RequirementFacility, type: :model do
  describe "validate RequirementFacility" do
    before do
      new_parking = FactoryBot.create(:parking, id: 1)
    end

    context "with facility_name, free_time, only_weekdays" do
      new_requirement_facility = FactoryBot.build(:requirement_facility)

      it "is valid with full data" do
        expect(new_requirement_facility).to be_valid
      end
    end

    context "without facility_name" do
      new_requirement_facility = FactoryBot.build(:requirement_facility, facility_name: "")

      it "is invalid without facility_name" do
        expect(new_requirement_facility).not_to be_valid
      end
    end

    context "without free_time" do
      new_requirement_facility = FactoryBot.build(:requirement_facility, free_time: "")

      it "is invalid without free_time" do
        expect(new_requirement_facility).not_to be_valid
      end
    end

    context "without only_weekdays" do
      new_requirement_facility = FactoryBot.build(:requirement_facility, only_weekdays: "")

      it "is invalid without only_weekdays" do
        expect(new_requirement_facility).not_to be_valid
      end
    end
  end
end
