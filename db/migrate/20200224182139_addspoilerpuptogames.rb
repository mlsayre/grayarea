class Addspoilerpuptogames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :pupspoilerusedp1, :integer, :array => true, :default => '{}'
  	add_column :games, :pupspoilerusedp2, :integer, :array => true, :default => '{}'
  	add_column :games, :pupspoilerusedp3, :integer, :array => true, :default => '{}'
  	add_column :games, :pupspoilerusedp4, :integer, :array => true, :default => '{}'
  	add_column :games, :pupspoilerusedp5, :integer, :array => true, :default => '{}'
  	add_column :games, :pupspoilerusedp6, :integer, :array => true, :default => '{}'
  	add_column :games, :pupneutralused1, :boolean, :default => false
  	add_column :games, :pupneutralused2, :boolean, :default => false
  	add_column :games, :pupneutralused3, :boolean, :default => false
  	add_column :games, :pupneutralused4, :boolean, :default => false
  	add_column :games, :pupneutralused5, :boolean, :default => false
  	add_column :games, :pupneutralused6, :boolean, :default => false
  end
end
