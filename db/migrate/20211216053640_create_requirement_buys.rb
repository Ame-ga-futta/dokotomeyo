class CreateRequirementBuys < ActiveRecord::Migration[6.0]
  def change
    create_table :requirement_buys do |t|
      t.integer :parking_id
      t.string :facility_name
      t.integer :purchase_price
      t.time :free_time
      t.boolean :only_weekdays

      t.timestamps
    end
  end
end
