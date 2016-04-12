class AddIndexToTriggersCategory < ActiveRecord::Migration
  def change
    add_index :triggers, :category, unique: true
  end
end
