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
end