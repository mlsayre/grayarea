class Addcheatstogame < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :cheats, :integer, :default => 0
  end
end
