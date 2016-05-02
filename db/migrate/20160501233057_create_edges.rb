class CreateEdges < ActiveRecord::Migration
  def change
    create_table :edges do |t|
      t.integer :source_id, null: false
      t.integer :target_id, null: false
      t.timestamps null: false
    end

    add_index :edges, :source_id
    add_index :edges, :target_id
  end
end
