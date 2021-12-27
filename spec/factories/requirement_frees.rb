FactoryBot.define do
  factory :requirement_free do
    parking_id             { 1 }
    only_weekdays          { false }
  end
end
