class Addstatstouser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :statgiverallsix, :integer, :default => 0
  	add_column :users, :statgiverscorehundred, :integer, :default => 0
  	add_column :users, :statgivernospoilers, :integer, :default => 0
  	add_column :users, :statgiverscoretwohundred, :integer, :default => 0
  	add_column :users, :statguesserallsix, :integer, :default => 0
  	add_column :users, :statguesserscorehundred, :integer, :default => 0
  	add_column :users, :statguesserscoretwohundred, :integer, :default => 0
  	add_column :users, :statgiverstatus, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  	add_column :users, :statguesserstatus, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  	add_column :users, :statgivernotify, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  	add_column :users, :statguessernotify, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  end
end
