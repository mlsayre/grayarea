class Changeguesseridstointegers < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :guesser_id1
  	remove_column :games, :guesser_id2
  	remove_column :games, :guesser_id3
  	add_column :games, :guesser_id1, :integer
  	add_column :games, :guesser_id2, :integer
  	add_column :games, :guesser_id3, :integer
  end
end
