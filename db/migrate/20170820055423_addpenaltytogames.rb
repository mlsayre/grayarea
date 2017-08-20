class Addpenaltytogames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr1_penalty, :integer, :default => 0
  	add_column :games, :gsr2_penalty, :integer, :default => 0
  	add_column :games, :gsr3_penalty, :integer, :default => 0
  	add_column :games, :gsr4_penalty, :integer, :default => 0
  	add_column :games, :gsr5_penalty, :integer, :default => 0
  	add_column :games, :gsr6_penalty, :integer, :default => 0
  end
end
