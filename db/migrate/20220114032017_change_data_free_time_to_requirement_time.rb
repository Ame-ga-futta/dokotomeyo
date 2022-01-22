class ChangeDataFreeTimeToRequirementTime < ActiveRecord::Migration[6.0]
  def change
    change_column :requirement_times, :free_time, :string
  end
end
