class CreateWorkflowResponses < ActiveRecord::Migration
  def change
    create_table :workflow_responses do |t|
      t.integer :workflow_id, null: false
      t.integer :version, null: false, default: 1
      t.integer :response_id, null: false
      t.integer :parent_id
      t.integer :trigger_id
      t.integer :index, null: false, default: 0
      t.timestamps null: false
    end
  end
end
