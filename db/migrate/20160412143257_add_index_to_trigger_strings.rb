class AddIndexToTriggerStrings < ActiveRecord::Migration
  def change
    add_index :trigger_strings, [:trigger_id, :text], :unique => true
  end
end
