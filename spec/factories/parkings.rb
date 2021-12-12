FactoryBot.define do
  factory :parking do
    name                    { "parking" }
    address                 { "parking" }
    latitude                { 1.5 }
    longitude               { 1.5 }
    beginning_of_worktime   { "06:45:00" }
    end_of_worktime         { "07:45:00" }
  end
end
