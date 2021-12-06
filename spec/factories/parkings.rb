FactoryBot.define do
  factory :parking do
    name                    { "parking" }
    address                 { "parking" }
    latitude                { 1.5 }
    longitude               { 1.5 }
    beginning_of_worktime   { "2021-12-06 06:45:08" }
    end_of_worktime         { "2021-12-06 06:45:08" }
  end
end
