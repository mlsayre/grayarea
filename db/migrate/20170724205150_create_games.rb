class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :gamestatus
      t.integer :giver_id
      t.integer :guesser_id

      t.timestamps
    end
  end
end
