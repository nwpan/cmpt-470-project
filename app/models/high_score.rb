class HighScore < ActiveRecord::Base
  attr_accessible :game, :score, :user_id
end
