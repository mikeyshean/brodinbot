class CreateTriggers < ActiveRecord::Migration
  def change
    create_table :triggers do |t|
      t.string :category, null: false

      t.timestamps null: false
    end
  end
end
