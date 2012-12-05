class AddColoursToItems < ActiveRecord::Migration
  def change
	add_column :items, :red, :float, :default => 0
	add_column :items, :green, :float, :default => 0
	add_column :items, :blue, :float, :default => 0
  end
end
