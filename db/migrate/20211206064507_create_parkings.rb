class CreateParkings < ActiveRecord::Migration[6.0]
  def change
    create_table :parkings do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.time :beginning_of_worktime
      t.time :end_of_worktime

      t.timestamps
    end
  end
end
