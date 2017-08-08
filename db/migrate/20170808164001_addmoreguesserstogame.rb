class Addmoreguesserstogame < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr4_cheat, :integer, :default => 0
  	add_column :games, :gsr5_cheat, :integer, :default => 0
  	add_column :games, :gsr6_cheat, :integer, :default => 0
  	add_column :games, :gsr4_spoiler, :integer, :default => 0
  	add_column :games, :gsr5_spoiler, :integer, :default => 0
  	add_column :games, :gsr6_spoiler, :integer, :default => 0
  	add_column :games, :gsr4_status, :string, :default => "hint1,word1"
  	add_column :games, :gsr5_status, :string, :default => "hint1,word1"
  	add_column :games, :gsr6_status, :string, :default => "hint1,word1"
  	add_column :games, :guesser_id4, :integer, :default => 0
  	add_column :games, :guesser_id5, :integer, :default => 0
  	add_column :games, :guesser_id6, :integer, :default => 0
  	add_column :games, :gsr4_words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr5_words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr6_words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr4_score, :integer
  	add_column :games, :gsr5_score, :integer
  	add_column :games, :gsr6_score, :integer
  end
end
