class Item < ActiveRecord::Base
  attr_accessible :description, :image_url, :item_type, :name, :price
end
