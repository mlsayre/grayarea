class Addhint3wordstogames < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr1_h3words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr2_h3words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr3_h3words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr4_h3words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr5_h3words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr6_h3words, :string, :array => true, :default => '{}'
  end
end
