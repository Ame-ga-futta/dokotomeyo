RSpec.describe RequirementBuy, type: :model do
  describe "validate RequirementBuy" do
    before do
      new_parking = FactoryBot.create(:parking, id: 1)
    end

    context "with facility_name, purchase_price, free_time, only_weekdays" do
      new_requirement_buy = FactoryBot.build(:requirement_buy)

      it "is valid with full data" do
        expect(new_requirement_buy).to be_valid
      end
    end

    context "without facility_name" do
      new_requirement_buy = FactoryBot.build(:requirement_buy, facility_name: "")

      it "is invalid without facility_name" do
        expect(new_requirement_buy).not_to be_valid
      end
    end

    context "without purchase_price" do
      new_requirement_buy = FactoryBot.build(:requirement_buy, purchase_price: "")

      it "is invalid without purchase_price" do
        expect(new_requirement_buy).not_to be_valid
      end
    end

    context "without free_time" do
      new_requirement_buy = FactoryBot.build(:requirement_buy, free_time: "")

      it "is invalid without free_time" do
        expect(new_requirement_buy).not_to be_valid
      end
    end

    context "without only_weekdays" do
      new_requirement_buy = FactoryBot.build(:requirement_buy, only_weekdays: "")

      it "is invalid without only_weekdays" do
        expect(new_requirement_buy).not_to be_valid
      end
    end
  end
end
