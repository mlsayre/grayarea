class AddPowerupstoUsers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :pupspoilerdetector, :integer, :default => 0
  	add_column :users, :pupneutraltworemove, :integer, :default => 0
  end
end
