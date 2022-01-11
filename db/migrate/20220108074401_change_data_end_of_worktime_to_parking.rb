class ChangeDataEndOfWorktimeToParking < ActiveRecord::Migration[6.0]
  def change
    change_column :parkings, :end_of_worktime, :string
  end
end
