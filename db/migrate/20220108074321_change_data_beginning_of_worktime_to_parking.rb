class ChangeDataBeginningOfWorktimeToParking < ActiveRecord::Migration[6.0]
  def change
    change_column :parkings, :beginning_of_worktime, :string
  end
end
