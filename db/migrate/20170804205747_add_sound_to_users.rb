class AddSoundToUsers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :sound, :integer, :default => 1
  end
end
