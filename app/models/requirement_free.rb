class RequirementFree < ApplicationRecord
  MAX_REQUIREMENT_COUNT = 1

  validates :only_weekdays, inclusion: { in: [true, false] }

  belongs_to :parking
  before_destroy :last_one_check

  def additional_limit
    errors[:base] << "終日無料の条件はひとつまでしか設定できません" if parking.requirement_frees.count == MAX_REQUIREMENT_COUNT
  end

  def last_one_check
    return if destroyed_by_association.present?
    delete_count = parking.requirement_buys.count +
    parking.requirement_facilities.count +
    parking.requirement_frees.count +
    parking.requirement_times.count

    if delete_count == 1
      errors[:base] << "無料の条件は一つ以上必要です"
      throw :abort
    end
  end
end
