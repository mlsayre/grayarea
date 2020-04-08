class Addpowerupdefault < ActiveRecord::Migration[5.1]
  def change
  	change_column :users, :pupspoilerdetector, :integer, :default => 3
  	change_column :users, :pupneutraltworemove, :integer, :default => 3
  	add_column :users, :averagehearts, :float, :default => 0
  end
end
