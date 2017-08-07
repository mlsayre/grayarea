class PagesController < ApplicationController
	def rankings
		@giveravg = Game.giverrankings(current_user.id, 1)
		@guesseravg = Game.guesserrankings(current_user.id, 1)
		@combinedavg = Game.combinedrankings(current_user.id, 1)
	end
end
