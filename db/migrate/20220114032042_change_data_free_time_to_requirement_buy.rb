class ChangeDataFreeTimeToRequirementBuy < ActiveRecord::Migration[6.0]
  def change
    change_column :requirement_buys, :free_time, :string
  end
end
