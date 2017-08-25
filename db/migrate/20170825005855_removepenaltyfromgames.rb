class Removepenaltyfromgames < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :gsr1_penalty
  	remove_column :games, :gsr2_penalty
  	remove_column :games, :gsr3_penalty
  	remove_column :games, :gsr4_penalty
  	remove_column :games, :gsr5_penalty
  	remove_column :games, :gsr6_penalty

  	remove_column :games, :gsr1_score
  	remove_column :games, :gsr2_score
  	remove_column :games, :gsr3_score
  	remove_column :games, :gsr4_score
  	remove_column :games, :gsr5_score
  	remove_column :games, :gsr6_score

  	add_column :games, :gsr1_score, :integer, :default => 0
  	add_column :games, :gsr2_score, :integer, :default => 0
  	add_column :games, :gsr3_score, :integer, :default => 0
  	add_column :games, :gsr4_score, :integer, :default => 0
  	add_column :games, :gsr5_score, :integer, :default => 0
  	add_column :games, :gsr6_score, :integer, :default => 0
  end
end
