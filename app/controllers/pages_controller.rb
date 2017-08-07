class PagesController < ApplicationController
	def rankings
		Game.giverrankings(current_user.id, 1) != -1 ? @giveravg = Game.giverrankings(current_user.id, 1) : @giveravg = "na"
		Game.guesserrankings(current_user.id, 1) != -1 ? @guesseravg= Game.guesserrankings(current_user.id, 1) : @guesseravg = "na"
		Game.combinedrankings(current_user.id, 1) != -1 ? @combinedavg = Game.combinedrankings(current_user.id, 1) : @combinedavg = "na"

	end
end
