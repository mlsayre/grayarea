class Addinfotochats < ActiveRecord::Migration[5.1]
  def change
  	add_column :chats, :user_id, :integer
  	add_column :chats, :game_id, :integer
  	add_column :chats, :message, :string
  end
end
