class CreateRequirementFacilities < ActiveRecord::Migration[6.0]
  def change
    create_table :requirement_facilities do |t|
      t.integer :parking_id
      t.string :facility_name
      t.time :free_time
      t.boolean :only_weekdays

      t.timestamps
    end
  end
end
