class RemoveWorkflowIdFromResponses < ActiveRecord::Migration
  def change
    remove_column :responses, :workflow_id, :integer
    remove_column :responses, :trigger_id, :integer
    remove_column :responses, :parent_id, :integer
    remove_column :responses, :index, :integer
  end
end
