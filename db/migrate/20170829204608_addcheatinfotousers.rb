class Addcheatinfotousers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :lifetimecheatgames, :integer, :default => 0
  	add_column :users, :lifetimecheatreports, :integer, :default => 0
  end
end
