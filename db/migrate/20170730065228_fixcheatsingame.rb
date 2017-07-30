class Fixcheatsingame < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :cheats
  	add_column :games, :gsr1_cheat, :integer, :default => 0
  	add_column :games, :gsr2_cheat, :integer, :default => 0
  	add_column :games, :gsr3_cheat, :integer, :default => 0
  end
end
