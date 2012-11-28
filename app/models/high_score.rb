class HighScore < ActiveRecord::Base
  attr_accessible :game, :score

  belongs_to :user
end
