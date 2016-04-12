class CreateWorkflows < ActiveRecord::Migration
  def change
    create_table :workflows do |t|
      t.string :name, null: false
      t.integer :category
      t.boolean :is_active, null: false, default: true
      t.timestamps null: false
    end
  end
end
