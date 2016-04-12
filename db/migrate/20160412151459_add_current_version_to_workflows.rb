class AddCurrentVersionToWorkflows < ActiveRecord::Migration
  def change
    add_column :workflows, :current_version, :integer, null: false, default: 1
  end
end
