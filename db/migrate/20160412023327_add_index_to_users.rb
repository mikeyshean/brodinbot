class AddIndexToUsers < ActiveRecord::Migration
  def change
    add_index :users, :phone_number
  end
end
