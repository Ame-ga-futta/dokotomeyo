class CreateEditParams < ActiveRecord::Migration[6.0]
  def change
    create_table :edit_params do |t|
      t.text :params

      t.timestamps
    end
  end
end
