class Addperfecttousers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :statgiverperfect, :integer, :default => 0
  	add_column :users, :statguesserperfect, :integer, :default => 0
  	change_column_default(:users, :statgiverstatus, '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}')
  	change_column_default(:users, :statgivernotify, '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}')
  	change_column_default(:users, :statguesserstatus, '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}')
  	change_column_default(:users, :statguessernotify, '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}')
  end
end
