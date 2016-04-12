class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :phone_number, null: false, limit: 15
      t.string :name_first
      t.string :name_last      
      t.timestamps null: false
    end
  end
end
