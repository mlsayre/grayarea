class Changedeletegames < ActiveRecord::Migration[5.1]
  def change
  	change_column :users, :giverdeletegamesleft, :integer, :default => 3
  	add_column :users, :giverdeletecounter, :integer, :default => 0
  end
end
