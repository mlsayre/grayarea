class Addthirdhinttogames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :hintword3, :string, :default => ""
  	add_column :games, :hintnum3, :integer, :default => 0
  end
end
