class RemoveNullConstraintWorkflowResponse < ActiveRecord::Migration
  def change
    change_column :workflow_responses, :actionable_id, :integer, null: true
  end
end
