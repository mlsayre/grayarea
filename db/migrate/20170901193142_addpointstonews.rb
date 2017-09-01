class Addpointstonews < ActiveRecord::Migration[5.1]
  def change
  	add_column :news, :points, :integer, :default => 0
  end
end
