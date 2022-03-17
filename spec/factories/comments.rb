FactoryBot.define do
  factory :comment do
    parking_id { 1 }
    user_id { 1 }
    comment { "MyText" }
  end
end
