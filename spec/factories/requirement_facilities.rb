FactoryBot.define do
  factory :requirement_facility do
    parking_id { 1 }
    facility_name { "MyString" }
    free_time { "2021-12-16 05:33:36" }
    only_weekdays { false }
  end
end
