class AddCorrectwordsToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :correctwords, :string, :array => true, :default => '{}'
    add_column :games, :loseword, :string
  end
end
