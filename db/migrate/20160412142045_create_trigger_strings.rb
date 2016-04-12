class CreateTriggerStrings < ActiveRecord::Migration
  def change
    create_table :trigger_strings do |t|
      t.string :text, null: false
      t.integer :trigger_id, null: false
      t.timestamps null: false
    end

    add_index :trigger_strings, :trigger_id
  end
end
