class CreateHighScores < ActiveRecord::Migration
  def change
    create_table :high_scores do |t|
      t.integer :user_id
      t.string :game
      t.integer :score

      t.timestamps
    end
  end
end
