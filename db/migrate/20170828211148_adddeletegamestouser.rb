class Adddeletegamestouser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :giverdeletegamesleft, :integer, :default => 0
  end
end
