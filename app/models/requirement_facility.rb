class RequirementFacility < ApplicationRecord
  validates :facility_name, presence: true
  validates :free_time, presence: true
  validates :only_weekdays, inclusion: {in: [true, false]}

  belongs_to :parking
end
