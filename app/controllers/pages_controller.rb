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

	def resetstatnotify
		current_user.update(:statgivernotify => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
			:statguessernotify => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

		render body: nil
	end

end
