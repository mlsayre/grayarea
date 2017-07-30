class Addspoilertogames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr1_spoiler, :integer, :default => 0
  	add_column :games, :gsr2_spoiler, :integer, :default => 0
  	add_column :games, :gsr3_spoiler, :integer, :default => 0
  end
end
