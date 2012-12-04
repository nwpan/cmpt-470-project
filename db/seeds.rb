# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Hats    
Item.create :name => "Santa Hat", :item_type => "Hat", :price => 5000, :description => "Ho ho ho!", :model_name => "santa-hat"
Item.create :name => "Fedora", :item_type => "Hat", :price => 16000, :description => "A stylish complement to any outfit.", :model_name => "fedora"
Item.create :name => "Simple Hat", :item_type => "Hat", :price => 500, :description => "Just a simple hat to hide your messy hair."
Item.create :name => "Birthday Hat", :item_type => "Hat", :price => 2500, :description => "Happy birthday!", :model_name => "birthday-hat"
Item.create :name => "College Hat", :item_type => "Hat", :price => 1750, :description => "Look smart with this college hat.", :model_name => "college-hat"
Item.create :name => "Wide-Brimmed Hat", :item_type => "Hat", :price => 3000, :description => "Keep the sun out of your eyes.", :model_name => "wide-brimmed-hat"

#Tops    
Item.create :name => "Simple Shirt", :item_type => "Top", :price => 500, :description => "For service, wear with Simple Shoes."
Item.create :name => "SFU Hoodie", :item_type => "Top", :price => 60000, :description => "A warm hoodie emblazoned with the SFU logo."
Item.create :name => "Dress Shirt", :item_type => "Top", :price => 35000, :description => "Look good. Feel awesome."
Item.create :name => "Favourite Band T-Shirt", :item_type => "Top", :price => 7500, :description => "If you don't listen to Favourite Band, you're wrong."

#Bottoms   
Item.create :name => "Simple Jeans", :item_type => "Bottom", :price => 500, :description => "As simple as you can get."
Item.create :name => "Track Pants", :item_type => "Bottom", :price => 10000, :description => "Beat the competition with these stylish pants."
Item.create :name => "Skinny Jeans", :item_type => "Bottom", :price => 20000, :description => "With extra large pockets to hold your iPhone and your ego."
Item.create :name => "Jeggings", :item_type => "Bottom", :price => 999999, :description => "But why?"

#Shoes
Item.create :name => "These Shoes!", :item_type => "Shoes", :price => 8888, :description => "They fit perfectly, yes!"
Item.create :name => "Simple Shoes", :item_type => "Shoes", :price => 500, :description => "For those who just need something to cover their feet."
Item.create :name => "Snazzy Sneakers", :item_type => "Shoes", :price => 25000, :description => "Yep, they're snazzy."
Item.create :name => "Moon Boots", :item_type => "Shoes", :price => 100000, :description => "I'M A ROCKETMAN!"
