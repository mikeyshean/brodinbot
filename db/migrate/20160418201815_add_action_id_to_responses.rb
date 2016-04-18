class AddActionIdToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :action_id, :integer
  end
end
