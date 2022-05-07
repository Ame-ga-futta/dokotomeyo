FactoryBot.define do
  factory :inquiry do
    address { ENV['DOKOTOMEYO_GMAIL'] }
    message { "MyText" }
    name { "MyString" }
  end
end
