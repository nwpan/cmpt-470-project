class AlterItemsColours < ActiveRecord::Migration
  def up
	change_column :items, :red, :integer, :default => 0
	change_column :items, :green, :integer, :default => 0
	change_column :items, :blue, :integer, :default => 0
  end

  def down
	change_column :items, :red, :float, :default => 0
	change_column :items, :green, :float, :default => 0
	change_column :items, :blue, :float, :default => 0
  end
end
