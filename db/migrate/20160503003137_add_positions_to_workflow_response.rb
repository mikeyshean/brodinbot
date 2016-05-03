class AddPositionsToWorkflowResponse < ActiveRecord::Migration
  def change
    add_column :workflow_responses, :trigger_x, :float
    add_column :workflow_responses, :trigger_y, :float
    add_column :workflow_responses, :actionable_x, :float
    add_column :workflow_responses, :actionable_y, :float
  end
end
