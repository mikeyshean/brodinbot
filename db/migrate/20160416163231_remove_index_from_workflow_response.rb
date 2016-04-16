class RemoveIndexFromWorkflowResponse < ActiveRecord::Migration
  def change
    remove_column :workflow_responses, :index, :integer
    add_column :workflow_responses, :terminates, :boolean, null: false, default: false
  end
end
