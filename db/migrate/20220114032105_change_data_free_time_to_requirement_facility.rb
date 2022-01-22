class ChangeDataFreeTimeToRequirementFacility < ActiveRecord::Migration[6.0]
  def change
    change_column :requirement_facilities, :free_time, :string
  end
end
