class AddHintwordsToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :hintword1, :string, :default => ""
    add_column :games, :hintword2, :string, :default => ""
    add_column :games, :hintnum1, :integer, :default => 0
    add_column :games, :hintnum2, :integer, :default => 0
  end
end
