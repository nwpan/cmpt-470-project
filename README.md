cmpt-470-devnull-tech-eval
==========================

Tech Evaluation demo site for CMPT470 SFU Fall 2012 Group 1: /dev/null/

Database
---------------------------

To create items in the database, please follow respective sections below in `rails console`.

### Inserting Items

The following creates two items with attributes set and stores it in a temporary array, `items`:
```shell
	items = [
	    Item.create(:name => "Magical Wonder", :item_type => "Hat", :price => 2, :description => "This is a wonderful hat with magical powers."), 
	    Item.create(:name => "Ginger Bread Man", :item_type => "Toy", :price => 23, :description => "This is the ginger bread man.")
	]
```

### Creating a Dummy User
The following creates two items with attributes set and stores it in a temporary array, `user`:
```shell
	user = User.create(
		:first_name => "Test",
		:last_name => "Demo",
		:email => "nwpan@sfu.ca",
		:password => "testte",
		:password_confirmation => "testte")
```

### Associating Items to a User
The following inserts the two temporary items in the `items` array to our temporary user:
```shell
	user.items << items
	user.save!
```

