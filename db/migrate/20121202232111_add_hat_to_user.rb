class AddHatToUser < ActiveRecord::Migration
  def change
    add_column :users, :hat, :integer
    add_column :users, :colour1, :float
    add_column :users, :colour2, :float
    add_column :users, :colour3, :float
  end
end
