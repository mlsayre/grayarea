class Addtutorialtouser < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :showtutorial, :boolean, :default => true
  end
end
