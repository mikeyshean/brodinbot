class CreateUserWorkflows < ActiveRecord::Migration
  def change
    create_table :user_workflows do |t|
      t.integer :workflow_id, null: false
      t.integer :version, null: false, default: 1
      t.integer :user_id, null: false
      t.integer :index, null: false, default: 0
      t.datetime :started_at
      t.datetime :ended_at
      t.timestamps null: false
    end
  end
end
