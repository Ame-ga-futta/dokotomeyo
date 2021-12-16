RSpec.describe Parking, type: :model do
  describe "validate Parking" do
    context "with name, address, latitude, longitude, beginning_of_worktime and end_of_worktime" do
      new_parking = FactoryBot.build(:parking)

      it "is valid with full data" do
        expect(new_parking).to be_valid
      end
    end

    context "without name" do
      new_parking = FactoryBot.build(:parking, name: "")

      it "is invalid without name" do
        expect(new_parking).not_to be_valid
      end
    end

    context "without address" do
      new_parking = FactoryBot.build(:parking, address: "")

      it "is invalid without address" do
        expect(new_parking).not_to be_valid
      end
    end

    context "without latitude" do
      new_parking = FactoryBot.build(:parking, latitude: "")

      it "is invalid without latitude" do
        expect(new_parking).not_to be_valid
      end
    end

    context "without longitude" do
      new_parking = FactoryBot.build(:parking, longitude: "")

      it "is invalid without longitude" do
        expect(new_parking).not_to be_valid
      end
    end

    context "without beginning_of_worktime" do
      new_parking = FactoryBot.build(:parking, beginning_of_worktime: "")

      it "is invalid without beginning_of_worktime" do
        expect(new_parking).not_to be_valid
      end
    end

    context "without end_of_worktime" do
      new_parking = FactoryBot.build(:parking, end_of_worktime: "")

      it "is invalid without end_of_worktime" do
        expect(new_parking).not_to be_valid
      end
    end

    context "end_of_worktime is before beginning_of_worktime" do
      new_parking = FactoryBot.build(:parking, beginning_of_worktime: "08:00:00", end_of_worktime: "22:00:00")

      it "is invalid before beginning_of_worktime" do
        expect(new_parking).to be_valid
      end
    end

    context "end_of_worktime is after beginning_of_worktime" do
      new_parking = FactoryBot.build(:parking, beginning_of_worktime: "08:00:00", end_of_worktime: "03:00:00")

      it "is valid after beginning_of_worktime" do
        expect(new_parking).not_to be_valid
      end
    end
  end

  describe "association Parking" do
    context "when deleted Parking" do
      it "delete requirement_buy" do
        new_parking = FactoryBot.create(:parking)
        new_requirement_buy = FactoryBot.create(:requirement_buy, parking_id: new_parking.id)

        expect{ new_parking.destroy }.to change{ RequirementBuy.count }.from(1).to(0)
      end

      it "delete requirement_facility" do
        new_parking = FactoryBot.create(:parking)
        new_requirement_facility = FactoryBot.create(:requirement_facility, parking_id: new_parking.id)

        expect{ new_parking.destroy }.to change{ RequirementFacility.count }.from(1).to(0)
      end

      it "delete requirement_free" do
        new_parking = FactoryBot.create(:parking)
        new_requirement_free = FactoryBot.create(:requirement_free, parking_id: new_parking.id)

        expect{ new_parking.destroy }.to change{ RequirementFree.count }.from(1).to(0)
      end

      it "delete requirement_time" do
        new_parking = FactoryBot.create(:parking)
        new_requirement_time = FactoryBot.create(:requirement_time, parking_id: new_parking.id)

        expect{ new_parking.destroy }.to change{ RequirementTime.count }.from(1).to(0)
      end
    end
  end
end
