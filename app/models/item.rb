class Item < ActiveRecord::Base
  attr_accessible :description, :model_name, :item_type, :name, :price, :red, :green, :blue

  has_many :user, :through => :inventory
  paginates_per 6
end
