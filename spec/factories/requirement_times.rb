FactoryBot.define do
  factory :requirement_time do
    parking_id             { 1 }
    free_time              { "03:00:00" }
    only_weekdays          { false }
  end
end
