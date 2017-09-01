class CreateNews < ActiveRecord::Migration[5.1]
  def change
    create_table :news do |t|
    	t.integer :newstype, default: 0
    	t.integer :targetuser_id, default: 0
    	t.integer :giveruser_id, default: 0
    	t.integer :targetgame_id, default: 0
    	t.integer :seen, default: 0
      t.timestamps
    end

    add_index :games, :gamestatus
    add_index :games, :giver_id
    add_index :games, :guesser_id1
    add_index :games, :guesser_id2
    add_index :games, :guesser_id3
    add_index :games, :guesser_id4
    add_index :games, :guesser_id5
    add_index :games, :guesser_id6
    add_index :games, :gsr1_status
    add_index :games, :gsr2_status
    add_index :games, :gsr3_status
    add_index :games, :gsr4_status
    add_index :games, :gsr5_status
    add_index :games, :gsr6_status
    add_index :games, :gsr1_score
    add_index :games, :gsr2_score
    add_index :games, :gsr3_score
    add_index :games, :gsr4_score
    add_index :games, :gsr5_score
    add_index :games, :gsr6_score
  end
end
