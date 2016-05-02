class ChangeParentIdToIsRoot < ActiveRecord::Migration
  def change
    remove_column :workflow_responses, :parent_id, :is_root, :boolean
    add_column :workflow_responses, :is_root, :boolean, null: false, default: false
  end
end
