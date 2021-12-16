FactoryBot.define do
  factory :requirement_time do
    parking_id { 1 }
    free_time { "2021-12-16 05:30:48" }
    only_weekdays { false }
  end
end
