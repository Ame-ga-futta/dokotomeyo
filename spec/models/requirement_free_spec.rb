RSpec.describe RequirementFree, type: :model do
  describe "validate RequirementFree" do
    before do
      new_parking = FactoryBot.create(:parking, id: 1)
    end

    context "with only_weekdays" do
      new_requirement_free = FactoryBot.build(:requirement_free)

      it "is valid with full data" do
        expect(new_requirement_free).to be_valid
      end
    end

    context "without only_weekdays" do
      new_requirement_free = FactoryBot.build(:requirement_free, only_weekdays: "")

      it "is invalid without only_weekdays" do
        expect(new_requirement_free).not_to be_valid
      end
    end
  end
end
