class AlterItemImageUrlToModel < ActiveRecord::Migration
  def up
  	rename_column :items, :image_url, :model_name
  end

  def down
  	rename_column :items, :model_name, :image_url
  end
end
