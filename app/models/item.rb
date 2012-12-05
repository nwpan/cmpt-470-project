class Item < ActiveRecord::Base
  attr_accessible :description, :model_name, :item_type, :name, :price

  has_many :user, :through => :inventory
  paginates_per 6
  COLOURS = ["Red", "Blue", "Green"]
end
