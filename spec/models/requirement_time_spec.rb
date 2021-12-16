RSpec.describe RequirementTime, type: :model do
  describe "validate RequirementTime" do
    before do
      new_parking = FactoryBot.create(:parking, id: 1)
    end

    context "with free_time, only_weekdays" do
      new_requirement_time = FactoryBot.build(:requirement_time)

      it "is valid with full data" do
        expect(new_requirement_time).to be_valid
      end
    end

    context "without free_time" do
      new_requirement_time = FactoryBot.build(:requirement_time, free_time: "")

      it "is invalid without free_time" do
        expect(new_requirement_time).not_to be_valid
      end
    end

    context "without only_weekdays" do
      new_requirement_time = FactoryBot.build(:requirement_time, only_weekdays: "")

      it "is invalid without only_weekdays" do
        expect(new_requirement_time).not_to be_valid
      end
    end
  end
end
