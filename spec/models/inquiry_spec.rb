RSpec.describe Inquiry, type: :model do
  describe "validate Inquiry" do
    context "with name, address and message" do
      it "is valid with name, address and message" do
        expect(build(:inquiry)).to be_valid
      end
    end

    context "without name" do
      it "is invalid without name" do
        expect(build(:inquiry, name: "")).not_to be_valid
      end
    end

    context "without address" do
      it "is invalid without address" do
        expect(build(:inquiry, address: "")).not_to be_valid
      end
    end

    context "without message" do
      it "is invalid without message" do
        expect(build(:inquiry, message: "")).not_to be_valid
      end
    end

    context "the length of name is over 20" do
      context "the length of name is 20" do
        it "is valid when the length of name is 20" do
          expect(build(:inquiry, name: "new_inquiryyyyyyyyyy")).to be_valid
        end
      end

      context "the length of name is 21" do
        it "is invalid when the length of name is 21" do
          expect(build(:inquiry, name: "new_inquiryyyyyyyyyyy")).not_to be_valid
        end
      end
    end
  end
end
