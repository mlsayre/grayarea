class Addguesserstreakstouser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :statguessernospoilers, :integer, :default => 0
  	add_column :users, :statalltimeguesserstreak, :integer, :default => 0
  	change_column_default(:users, :statguesserstatus, '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}')
  	change_column_default(:users, :statguessernotify, '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}')
  end
end
