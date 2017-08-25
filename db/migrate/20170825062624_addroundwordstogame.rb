class Addroundwordstogame < ActiveRecord::Migration[5.1]
  def change
  	add_column :games, :gsr1_h1words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr2_h1words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr3_h1words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr4_h1words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr5_h1words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr6_h1words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr1_h2words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr2_h2words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr3_h2words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr4_h2words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr5_h2words, :string, :array => true, :default => '{}'
  	add_column :games, :gsr6_h2words, :string, :array => true, :default => '{}'
  end
end
