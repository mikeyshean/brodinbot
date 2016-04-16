class RenameUserWorkflowsIndexToWorkflowResponseId < ActiveRecord::Migration
  def change
    rename_column :user_workflows, :index, :workflow_response_id

    add_index :user_workflows, :user_id
  end
end
