FactoryBot.define do
  factory :parking do
    id                      { 1 }
    name                    { "parking" }
    address                 { "parking" }
    latitude                { 1.5 }
    longitude               { 1.5 }
    beginning_of_worktime   { "08:00:00" }
    end_of_worktime         { "22:00:00" }
  end
end
