class Changeaboutmesection < ActiveRecord::Migration[5.1]
  def change
  	change_column :users, :aboutme, :string, :default => "I'm playing Word Stretch!", :limit => 100
  end
end
