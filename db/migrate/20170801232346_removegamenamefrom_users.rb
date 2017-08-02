class RemovegamenamefromUsers < ActiveRecord::Migration[5.1]
  def change
  	remove_column :games, :gamename
  end
end
