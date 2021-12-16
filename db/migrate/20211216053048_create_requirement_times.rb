class CreateRequirementTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :requirement_times do |t|
      t.integer :parking_id
      t.time :free_time
      t.boolean :only_weekdays

      t.timestamps
    end
  end
end
