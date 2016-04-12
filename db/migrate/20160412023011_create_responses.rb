class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.text :body, null: false
      t.integer :workflow_id
      t.integer :index, null: false, default: 0
      t.timestamps null: false
    end

    add_index :responses, :workflow_id
  end
end
