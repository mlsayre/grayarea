class AddChatsNotifyToGames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :giver_chats, :integer, :default => 0
  	add_column :games, :gsr1_chats, :integer, :default => 0
  	add_column :games, :gsr2_chats, :integer, :default => 0
  	add_column :games, :gsr3_chats, :integer, :default => 0
  	add_column :games, :gsr4_chats, :integer, :default => 0
  	add_column :games, :gsr5_chats, :integer, :default => 0
  	add_column :games, :gsr6_chats, :integer, :default => 0
  end
end
