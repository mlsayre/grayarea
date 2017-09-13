class Addalltimestreaktousers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :statalltimegiverstreak, :integer, :default => 0
  	add_column :games, :endtime_gsr1, :datetime, :default => 1.week.ago
  	add_column :games, :endtime_gsr2, :datetime, :default => 1.week.ago
  	add_column :games, :endtime_gsr3, :datetime, :default => 1.week.ago
  	add_column :games, :endtime_gsr4, :datetime, :default => 1.week.ago
  	add_column :games, :endtime_gsr5, :datetime, :default => 1.week.ago
  	add_column :games, :endtime_gsr6, :datetime, :default => 1.week.ago
  end
end
