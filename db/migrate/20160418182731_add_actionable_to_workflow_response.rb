class AddActionableToWorkflowResponse < ActiveRecord::Migration
  def change
    rename_column :workflow_responses, :response_id, :actionable_id
    add_column :workflow_responses, :actionable_type, :string
    add_index :workflow_responses, [:workflow_id, :version, :actionable_id], :name => 'workflow_version_action_index'
  end
end
