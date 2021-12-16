class RequirementFree < ApplicationRecord
  validates :only_weekdays, inclusion: {in: [true, false]}

  belongs_to :parking
end
