class AddTitleToGames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gamename, :string, :default => ""
  end
end
