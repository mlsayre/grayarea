class Fixstatsforusers < ActiveRecord::Migration[5.1]
  def change
  	remove_column :users, :statgiverstatus
  	remove_column :users, :statguesserstatus
  	remove_column :users, :statgivernotify
  	remove_column :users, :statguessernotify
  	add_column :users, :statgiverstatus, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  	add_column :users, :statguesserstatus, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  	add_column :users, :statgivernotify, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  	add_column :users, :statguessernotify, :integer, :array => true, :default => '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}'
  end
end
