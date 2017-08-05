class PagesController < ApplicationController
	def rankings
		@giveravg = Game.giverrankings(current_user.id)
		@guesseravg = Game.guesserrankings(current_user.id)
	end
end
