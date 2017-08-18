class Addnumbergamestouser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :lifetimegamesgiver, :integer, :default => 0
  	add_column :users, :lifetimegamesguesser, :integer, :default => 0
  end
end
