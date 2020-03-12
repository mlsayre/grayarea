class Changeneutralpup < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :pupneutralused1
  	remove_column :games, :pupneutralused2
  	remove_column :games, :pupneutralused3
  	remove_column :games, :pupneutralused4
  	remove_column :games, :pupneutralused5
  	remove_column :games, :pupneutralused6
  	add_column :games, :pupneutralused1, :boolean, :array => true, :default => '{}'
  	add_column :games, :pupneutralused2, :boolean, :array => true, :default => '{}'
  	add_column :games, :pupneutralused3, :boolean, :array => true, :default => '{}'
  	add_column :games, :pupneutralused4, :boolean, :array => true, :default => '{}'
  	add_column :games, :pupneutralused5, :boolean, :array => true, :default => '{}'
  	add_column :games, :pupneutralused6, :boolean, :array => true, :default => '{}'
  end
end
