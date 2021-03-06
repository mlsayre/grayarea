class Addoauthinfotousers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :uid, :string
  	add_column :users, :theme, :string, :default => "theme-default"
  	add_column :users, :avatar_file_name, :string
  	add_column :users, :avatar_content_type, :string
  	add_column :users, :avatar_file_size, :integer
  	add_column :users, :avatar_updated_at, :datetime
  end
end
