class Addaboutmesection < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :aboutme, :string, :default => "I'm playing Word Stretch!"
  end
end
