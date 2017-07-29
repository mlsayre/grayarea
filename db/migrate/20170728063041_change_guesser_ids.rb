class ChangeGuesserIds < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :guesser_ids
  	add_column :games, :guesser_id1, :string, :default => ''
  	add_column :games, :guesser_id2, :string, :default => ''
  	add_column :games, :guesser_id3, :string, :default => ''
  	add_column :games, :gsr1_words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr2_words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr3_words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr1_score, :integer
  	add_column :games, :gsr2_score, :integer
  	add_column :games, :gsr3_score, :integer
  end
end
