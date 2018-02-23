class PagesController < ApplicationController
	# def rankings
	# 	#just weekly
	# 	userstats = Game.combinedrankings(current_user.id,1,1,1,true)
	# 	userstats[0] != -1 ? @giveravgweek = userstats[0] : @giveravgweek = "na"
	# 	userstats[1] != -1 ? @guesseravgweek = userstats[1] : @guesseravgweek = "na"
	# 	userstats[2] != -1 ? @combinedavgweek = userstats[2] : @combinedavgweek = "na"

	# 	@alluserstatsweek = Game.allcombinedrankings(5,5,5,true)

	# 	@usersgiversweek = Game.usersgiversstats(current_user.id,true)

	# 	@usersguessersweek = Game.usersguessersstats(current_user.id,true)
	# end

	def weeklyranks
		#just weekly
		userstats = Game.combinedrankings(current_user.id,1,1,1,true)
		userstats[0] != -1 ? @giveravgweek = userstats[0] : @giveravgweek = "na"
		userstats[1] != -1 ? @guesseravgweek = userstats[1] : @guesseravgweek = "na"
		userstats[2] != -1 ? @combinedavgweek = userstats[2] : @combinedavgweek = "na"

		@alluserstatsweek = Game.allcombinedrankings(5,5,5,true)

		@usersgiversweek = Game.usersgiversstats(current_user.id,true)

		@usersguessersweek = Game.usersguessersstats(current_user.id,true)
	end

	def alltimeranks
		userstats = Game.combinedrankings(current_user.id,1,1,1,false)
		userstats[0] != -1 ? @giveravg = userstats[0] : @giveravg = "na"
		userstats[1] != -1 ? @guesseravg = userstats[1] : @guesseravg = "na"
		userstats[2] != -1 ? @combinedavg = userstats[2] : @combinedavg = "na"

		@alluserstats = Game.allcombinedrankings(5,5,5,false)

		@usersgivers = Game.usersgiversstats(current_user.id,false)

		@usersguessers = Game.usersguessersstats(current_user.id,false)
	end

	def allfeedseen
		usernews = News.where(:targetuser_id => current_user.id).all
		usernews.update_all(:seen => 1);
		usernews.order('created_at DESC').offset(20).destroy_all

		respond_to do |format|
      format.json  { render json: {} , status: 200 }
    end
	end

	def feats
		gon.giverstatus = current_user.statgiverstatus
		gon.guesserstatus = current_user.statguesserstatus
		gon.givernotify = current_user.statgivernotify
		gon.guessernotify = current_user.statguessernotify
	end

	def avatar_customize
		@bgcount = User.avatarpartspoints("bg", 1, "true")
		@headcount = User.avatarpartspoints("head", 1, "true")
		@mouthcount = User.avatarpartspoints("mouth", 1, "true")
		@eyescount = User.avatarpartspoints("eyes", 1, "true")
		@decocount = User.avatarpartspoints("deco", 1, "true")
		@haircount = User.avatarpartspoints("hair", 1, "true")
		@playerfeatscore = current_user.statguesserstatus.sum + current_user.statgiverstatus.sum
		avguesserbgnum = current_user.avatar_content_type.split("-")[0].split(":")[1]
    @avguesserbgurl = User.avatarpartsurl("bg", avguesserbgnum.to_i)
    avguesserheadnum = current_user.avatar_content_type.split("-")[1].split(":")[1]
    @avguesserheadurl = User.avatarpartsurl("head", avguesserheadnum.to_i)
    avguessermouthnum = current_user.avatar_content_type.split("-")[2].split(":")[1]
    @avguessermouthurl = User.avatarpartsurl("mouth", avguessermouthnum.to_i)
    avguessereyesnum = current_user.avatar_content_type.split("-")[3].split(":")[1]
    @avguessereyesurl = User.avatarpartsurl("eyes", avguessereyesnum.to_i)
    avguesserdeconum = current_user.avatar_content_type.split("-")[4].split(":")[1]
    @avguesserdecourl = User.avatarpartsurl("deco", avguesserdeconum.to_i)
    avguesserhairnum = current_user.avatar_content_type.split("-")[5].split(":")[1]
    @avguesserhairurl = User.avatarpartsurl("hair", avguesserhairnum.to_i)
	end

	def resetstatnotify
		current_user.update(:statgivernotify => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
			:statguessernotify => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

		render body: nil
	end

end
