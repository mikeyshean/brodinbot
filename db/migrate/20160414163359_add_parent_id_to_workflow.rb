class AddParentIdToWorkflow < ActiveRecord::Migration
  def change
    add_column :workflows, :parent_id, :integer
  end
end
