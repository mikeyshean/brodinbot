class CreateActions < ActiveRecord::Migration
  def change
    create_table :actions do |t|
      t.string :method, null: false
      t.timestamps null: false
    end
  end
end
