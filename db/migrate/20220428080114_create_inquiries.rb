class CreateInquiries < ActiveRecord::Migration[6.0]
  def change
    create_table :inquiries do |t|
      t.string :address
      t.text :message
      t.string :name

      t.timestamps
    end
  end
end
