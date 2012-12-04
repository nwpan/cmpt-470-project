cmpt-470-devnull-tech-eval
==========================

Tech Evaluation demo site for CMPT470 SFU Fall 2012 Group 1: /dev/null/

### Starcraft Cheat-Code
To get 1000 credits, please replace `[user id]`, with your respective user id in the URL below and press enter:
`http://cmpt470.csil.sfu.ca:8001/users/[user id]/showmethemoney`

This little easter-egg is primarily for the course instructor to quickly obtain credits for use in the store.

Deploying to Production
---------------------------

### Deploy by Script
To deploy (master) to production, please follow the respective sections below by SSHing to our server:
```shell
    ssh cmpt470.csil.sfu.ca
```

Remember to SSH into our virtual server within the CMPT470 CSIL's server:
```shell
    ssh group1@mx1
```

Once logged in, please use the following to change directory to our server directory:
```shell
    cd /var/www/dev_scripts
```

Run the following script, you will be prompted for `sudo` to restart passenger at the end of the script:
```shell
    sh deploy.sh
```

The server should now be reset -- for a sanity check, please check http://cmpt470.csil.sfu.ca:8001 and visually verify if the changes has been pushed up.

Cheers!

### If the Server Fails to Deploy...
Open up the `/dev_scripts/deploy.sh` file and execute the commands manually.

And if some how passenger fails to restart, please run the following command on the server within `/var/www/`:
```shell
    sudo touch tmp/restart.txt
```

This will restart passenger, so please `touch` it as much as you like!

Database
---------------------------

To create items in the database, please follow respective sections below running `rails console`.

### Inserting Items

The following creates two items with attributes set and stores it in a temporary array, `items`:
```shell
	items = [
	    Item.create(:name => "Magical Wonder", :item_type => "Hat", :price => 2, :description => "This is a wonderful hat with magical powers."), 
	    Item.create(:name => "Ginger Bread Man", :item_type => "Toy", :price => 23, :description => "This is the ginger bread man.")
	]
```

SQL Query:
```shell
mysql> select * from items;
+----+------------------+-----------+-------+-----------+----------------------------------------------+---------------------+---------------------+
| id | name             | item_type | price | image_url | description                                  | created_at          | updated_at          |
+----+------------------+-----------+-------+-----------+----------------------------------------------+---------------------+---------------------+
|  1 | Magical Wonder   | Hat       |     2 | NULL      | This is a wonderful hat with magical powers. | 2012-11-25 22:04:58 | 2012-11-25 22:04:58 |
|  2 | Ginger Bread Man | Toy       |    23 | NULL      | This is the ginger bread man.                | 2012-11-25 22:04:58 | 2012-11-25 22:04:58 |
+----+------------------+-----------+-------+-----------+----------------------------------------------+---------------------+---------------------+
2 rows in set (0.00 sec)
```

### Creating a Dummy User
The following creates two items with attributes set and stores it in a temporary array, `user`:
```shell
	user = User.create(:first_name => "Test", :last_name => "Demo", :email => "nwpan@sfu.ca", :password => "testte", :password_confirmation => "testte")
```

SQL Query:
```shell
mysql> select * from users;
+----+------------+-----------+--------------+----------+--------------------------------------------------------------+---------------------+---------------------+------------------------+---------+
| id | first_name | last_name | email        | password | password_digest                                              | created_at          | updated_at          | remember_token         | balance |
+----+------------+-----------+--------------+----------+--------------------------------------------------------------+---------------------+---------------------+------------------------+---------+
|  1 | Test       | Demo      | nwpan@sfu.ca | NULL     | $2a$10$HFRXWHDyxBuVvhCt1qdTp.XfmTfTEYOJQZv8e.zb2Lf/EQB/Zvwpu | 2012-11-25 22:06:47 | 2012-11-25 22:06:47 | hbDO5eQdPDPZtt60AEK7iQ |       0 |
+----+------------+-----------+--------------+----------+--------------------------------------------------------------+---------------------+---------------------+------------------------+---------+
1 row in set (0.00 sec)
```

### Associating Items to a User
The following inserts the two temporary items in the `items` array to our temporary user:
```shell
	user.items << items && user.save!
```

SQL Query:
```shell
mysql> select * from inventories;
+----+---------+---------+---------------------+---------------------+
| id | user_id | item_id | created_at          | updated_at          |
+----+---------+---------+---------------------+---------------------+
|  1 |       1 |       1 | 2012-11-25 22:07:32 | 2012-11-25 22:07:32 |
|  2 |       1 |       2 | 2012-11-25 22:07:32 | 2012-11-25 22:07:32 |
+----+---------+---------+---------------------+---------------------+
2 rows in set (0.00 sec)
```

### Querying (using AREL Active Record) for Items Belonging to a User
The following pulls from the database for the current user's items (through inventory):
```shell
	user.items
```

Outputs:
```shell
  Item Load (0.9ms)  SELECT `items`.* FROM `items` INNER JOIN `inventories` ON `items`.`id` = `inventories`.`item_id` WHERE `inventories`.`user_id` = 1
 => [#<Item id: 1, name: "Magical Wonder", item_type: "Hat", price: 2, image_url: nil, description: "This is a wonderful hat with magical powers.", created_at: "2012-11-25 22:04:58", updated_at: "2012-11-25 22:04:58">, #<Item id: 2, name: "Ginger Bread Man", item_type: "Toy", price: 23, image_url: nil, description: "This is the ginger bread man.", created_at: "2012-11-25 22:04:58", updated_at: "2012-11-25 22:04:58">] 
 ```
