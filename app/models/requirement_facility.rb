class RequirementFacility < ApplicationRecord
  validates :facility_name, presence: true
  validates :free_time, presence: true
  validates :only_weekdays, inclusion: { in: [true, false] }
  validate :free_time_check, :higher_requirement_check

  belongs_to :parking

  def free_time_check
    errors[:base] << "無料時間を入力してください" if free_time == "00:00"
  end

  def higher_requirement_check
    if parking.requirement_frees.exists?
      errors[:base] << "終日無料の条件と重複するため追加できません" if parking.requirement_frees.first["only_weekdays"] == only_weekdays
    end
  end
end
