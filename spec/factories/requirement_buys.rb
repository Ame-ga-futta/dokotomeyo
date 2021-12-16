FactoryBot.define do
  factory :requirement_buy do
    parking_id             { 1 }
    facility_name          { "Parking" }
    purchase_price         { 1000 }
    free_time              { "03:00:00" }
    only_weekdays          { false }
  end
end
