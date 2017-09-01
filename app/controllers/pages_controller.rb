class PagesController < ApplicationController
	def rankings
		Game.giverrankings(current_user.id, 1) != -1 ? @giveravg = Game.giverrankings(current_user.id, 1) : @giveravg = "na"
		Game.guesserrankings(current_user.id, 1) != -1 ? @guesseravg= Game.guesserrankings(current_user.id, 1) : @guesseravg = "na"
		Game.combinedrankings(current_user.id, 1) != -1 ? @combinedavg = Game.combinedrankings(current_user.id, 1) : @combinedavg = "na"

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
