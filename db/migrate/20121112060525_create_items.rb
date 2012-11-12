class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :item_type
      t.integer :price
      t.string :image_url
      t.text :description

      t.timestamps
    end
  end
end
