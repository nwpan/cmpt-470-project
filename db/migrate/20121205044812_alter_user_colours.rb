class AlterUserColours < ActiveRecord::Migration
  def up
	change_column :users, :colour1, :integer
	change_column :users, :colour2, :integer
	change_column :users, :colour3, :integer
  end

  def down
	change_column :users, :colour1, :float
	change_column :users, :colour2, :float
	change_column :users, :colour3, :float	
  end
end
