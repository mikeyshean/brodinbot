class AddUserWorkflowIdToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :user_workflow_id, :integer
    add_column :user_workflows, :message_id, :integer    
  end
end
