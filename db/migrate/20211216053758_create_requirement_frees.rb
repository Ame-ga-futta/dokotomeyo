class CreateRequirementFrees < ActiveRecord::Migration[6.0]
  def change
    create_table :requirement_frees do |t|
      t.integer :parking_id
      t.boolean :only_weekdays

      t.timestamps
    end
  end
end
