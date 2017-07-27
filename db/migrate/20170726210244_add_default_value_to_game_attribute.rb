class AddDefaultValueToGameAttribute < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :guesser_id
  	add_column :games, :guesser_ids, :string, :array => true, :default => '{}'
  end
end
