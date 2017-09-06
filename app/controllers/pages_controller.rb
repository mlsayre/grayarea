class PagesController < ApplicationController
	def rankings
		userstats = Game.combinedrankings(current_user.id,1,1,1)
		userstats[0] != -1 ? @giveravg = userstats[0] : @giveravg = "na"
		userstats[1] != -1 ? @guesseravg = userstats[1] : @guesseravg = "na"
		userstats[2] != -1 ? @combinedavg = userstats[2] : @combinedavg = "na"

		@alluserstats = Game.allcombinedrankings(5,5,5)
	end

	def allfeedseen
		usernews = News.where(:targetuser_id => current_user.id).all
		usernews.update_all(:seen => 1);
		usernews.order('created_at DESC').offset(20).destroy_all

		respond_to do |format|
      format.json  { render json: {} , status: 200 }
    end
	end
end
