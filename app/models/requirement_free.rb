class RequirementFree < ApplicationRecord
  MAX_REQUIREMENT_COUNT = 1

  validates :only_weekdays, inclusion: { in: [true, false] }

  belongs_to :parking

  def additional_limit
    errors[:base] << "終日無料の条件はひとつまでしか設定できません" if parking.requirement_frees.count == MAX_REQUIREMENT_COUNT
  end
end
