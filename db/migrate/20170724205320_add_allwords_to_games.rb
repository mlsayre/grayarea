class AddAllwordsToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :allwords, :string, :array => true, :default => '{}'
  end
end
