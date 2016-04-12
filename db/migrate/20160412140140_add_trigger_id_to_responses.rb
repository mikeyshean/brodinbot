class AddTriggerIdToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :trigger_id, :integer
    add_column :responses, :parent_id, :integer
  end
end
