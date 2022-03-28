RSpec.describe Parking, type: :model do
  describe "validate Parking" do
    context "with name, address, latitude, longitude, beginning_of_worktime and end_of_worktime" do
      it "is valid with full data" do
        expect(build(:parking)).to be_valid
      end
    end

    context "without name" do
      it "is invalid without name" do
        expect(build(:parking, name: "")).not_to be_valid
      end
    end

    context "without address" do
      it "is invalid without address" do
        expect(build(:parking, address: "")).not_to be_valid
      end
    end

    context "without latitude" do
      it "is invalid without latitude" do
        expect(build(:parking, latitude: "")).not_to be_valid
      end
    end

    context "without longitude" do
      it "is invalid without longitude" do
        expect(build(:parking, longitude: "")).not_to be_valid
      end
    end

    context "without beginning_of_worktime" do
      it "is invalid without beginning_of_worktime" do
        expect(build(:parking, beginning_of_worktime: "")).not_to be_valid
      end
    end

    context "without end_of_worktime" do
      it "is invalid without end_of_worktime" do
        expect(build(:parking, end_of_worktime: "")).not_to be_valid
      end
    end

    context "end_of_worktime is before beginning_of_worktime" do
      it "is invalid before beginning_of_worktime" do
        expect(build(:parking, beginning_of_worktime: "08:00:00", end_of_worktime: "22:00:00")).to be_valid
      end
    end

    context "end_of_worktime is after beginning_of_worktime" do
      it "is valid after beginning_of_worktime" do
        expect(build(:parking, beginning_of_worktime: "08:00:00", end_of_worktime: "03:00:00")).to be_valid
      end
    end
  end

  describe "association Parking" do
    let!(:new_parking) { create(:parking) }
    let!(:new_user) { create(:user) }
    let!(:new_requirement_buy) { create(:requirement_buy, parking_id: new_parking.id) }
    let!(:new_requirement_facility) { create(:requirement_facility, parking_id: new_parking.id) }
    let!(:new_requirement_free) { create(:requirement_free, parking_id: new_parking.id, only_weekdays: true) }
    let!(:new_requirement_time) { create(:requirement_time, parking_id: new_parking.id) }
    let!(:new_favorite) { create(:favorite, parking_id: new_parking.id, user_id: new_user.id) }
    let!(:new_comment) { create(:comment, parking_id: new_parking.id, user_id: new_user.id) }


    context "when Parking is deleted" do
      it "requirement_buys is also deleted" do
        expect { new_parking.destroy }.to change { RequirementBuy.count }.from(1).to(0)
      end

      it "requirement_facilities is also deleted" do
        expect { new_parking.destroy }.to change { RequirementFacility.count }.from(1).to(0)
      end

      it "requirement_frees is also deleted" do
        expect { new_parking.destroy }.to change { RequirementFree.count }.from(1).to(0)
      end

      it "requirement_times is also deleted" do
        expect { new_parking.destroy }.to change { RequirementTime.count }.from(1).to(0)
      end

      it "favorites is also deleted" do
        expect { new_parking.destroy }.to change { Favorite.count }.from(1).to(0)
      end

      it "comments is also deleted" do
        expect { new_parking.destroy }.to change { Comment.count }.from(1).to(0)
      end
    end
  end
end
