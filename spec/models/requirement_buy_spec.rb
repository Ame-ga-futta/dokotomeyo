RSpec.describe RequirementBuy, type: :model do
  describe "validate RequirementBuy" do
    let!(:new_parking) { create(:parking, id: 1) }

    context "with facility_name, purchase_price, free_time, only_weekdays" do
      it "is valid with full data" do
        expect(build(:requirement_buy)).to be_valid
      end
    end

    context "without facility_name" do
      it "is invalid without facility_name" do
        expect(build(:requirement_buy, facility_name: "")).not_to be_valid
      end
    end

    context "without purchase_price" do
      it "is invalid without purchase_price" do
        expect(build(:requirement_buy, purchase_price: "")).not_to be_valid
      end
    end

    context "without free_time" do
      it "is invalid without free_time" do
        expect(build(:requirement_buy, free_time: "")).not_to be_valid
      end
    end

    context "without only_weekdays" do
      it "is invalid without only_weekdays" do
        expect(build(:requirement_buy, only_weekdays: "")).not_to be_valid
      end
    end
  end
end
