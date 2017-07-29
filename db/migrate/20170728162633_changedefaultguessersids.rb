class Changedefaultguessersids < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :guesser_id1
  	remove_column :games, :guesser_id2
  	remove_column :games, :guesser_id3
  	add_column :games, :guesser_id1, :integer, :default => 0
  	add_column :games, :guesser_id2, :integer, :default => 0
  	add_column :games, :guesser_id3, :integer, :default => 0
  end
end
