class Addheartstogame < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr1_heart, :integer, :default => 0
  	add_column :games, :gsr2_heart, :integer, :default => 0
  	add_column :games, :gsr3_heart, :integer, :default => 0
  	add_column :games, :gsr4_heart, :integer, :default => 0
  	add_column :games, :gsr5_heart, :integer, :default => 0
  	add_column :games, :gsr6_heart, :integer, :default => 0
  	add_column :users, :lifetimehearts, :integer, :default => 0
  	add_column :users, :heartnotify, :integer, :default => 0
  end
end
