FactoryBot.define do
  factory :user do
    name              { "user" }
    email             { ENV['DOKOTOMEYO_GMAIL'] }
    password          { "password" }
  end
end
