FactoryBot.define do
  factory :requirement_facility do
    parking_id             { 1 }
    facility_name          { "Parking" }
    free_time              { "03:00:00" }
    only_weekdays          { false }
  end
end
