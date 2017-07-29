class Addgamestatustogames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr1_status, :string, :default => "hint1,word1"
  	add_column :games, :gsr2_status, :string, :default => "hint1,word1"
  	add_column :games, :gsr3_status, :string, :default => "hint1,word1"
  end
end
