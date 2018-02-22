class Changeavatardefault < ActiveRecord::Migration[5.1]
  def change
  	bgnum = "%03d" % ((rand() * 19).to_i + 1)
		headnum = "%03d" % ((rand() * 4).to_i + 1)
		mouthnum = "%03d" % ((rand() * 5).to_i + 1)
		eyesnum = "%03d" % ((rand() * 4).to_i + 1)
		deconum = "%03d" % ((rand() * 3).to_i)
		hairnum = "%03d" % ((rand() * 6).to_i)
		avstring = "bg:" + bgnum + "-head:" + headnum + "-mouth:" + mouthnum + "-eyes:" + eyesnum + "-deco:" + deconum + "-hair:" + hairnum
		change_column :users, :avatar_content_type, :string, :default => avstring
  end
end
