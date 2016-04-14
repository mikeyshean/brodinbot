class ChangeMessagesResponseIdToWorkflowResponseId < ActiveRecord::Migration
  def change
    rename_column :messages, :response_id, :workflow_response_id
  end
end
