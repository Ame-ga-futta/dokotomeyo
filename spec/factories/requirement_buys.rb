FactoryBot.define do
  factory :requirement_buy do
    parking_id { 1 }
    facility_name { "MyString" }
    purchase_price { 1 }
    free_time { "2021-12-16 05:36:41" }
    only_weekdays { false }
  end
end
