class AddUserStats < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :lifetimepointsguesser, :integer, :default => 0
  	add_column :users, :averagepointsguesser, :float, :default => 0
  	add_column :users, :lifetimepointsgiver, :integer, :default => 0
  	add_column :users, :lifetimeplayedgamesgiver, :integer, :default => 0
  	add_column :users, :averagepointsgiver, :float, :default => 0
  end
end
