echo "Starting production deploy..."
cd /var/www/
git remote update
git pull origin master
bundle install
rake db:drop
rake db:create
rake db:migrate
rake db:reset
rake assets:precompile
sudo touch tmp/restart.txt
echo "Master branch pushed to production server, please check http://cmpt470.csil.sfu.ca:8001!"
