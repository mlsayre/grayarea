class Game < ApplicationRecord
	# def gamerank(gameid, userid)
 #    @numberofscores = Gamedata.where(:game_id => gameid).all.count
 #    @playerrank = Gamedata.where(:game_id => gameid).order('score DESC, updated_at ASC').collect(&:user_id)
 #                          .index(userid) + 1
 #    "#{@playerrank.ordinalize} of #{@numberofscores}"
 #  end

  def self.giverrankings(userid, min)
  	allusergivergames = Game.where(:giver_id => userid).all
  	allscores1 = allusergivergames.where(:gsr1_status => "over,over").collect(&:gsr1_score) || []
  	allscores2 = allusergivergames.where(:gsr2_status => "over,over").collect(&:gsr2_score) || []
  	allscores3 = allusergivergames.where(:gsr3_status => "over,over").collect(&:gsr3_score) || []
 
  	allscores = allscores1 + allscores2 + allscores3
  	if allscores.length < min
  		average = "na"
  	else
			average = (allscores.sum.to_f / allscores.length.to_f).round(2)
		end
  	return average
  end

  def self.guesserrankings(userid, min)
  	alluserguessergames = Game.where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ?", 
  		userid, userid, userid).all
  	allscores1 = alluserguessergames.where(:gsr1_status => "over,over").where(:guesser_id1 => userid)
  	  .collect(&:gsr1_score)
  	allscores2 = alluserguessergames.where(:gsr2_status => "over,over").where(:guesser_id2 => userid)
  	  .collect(&:gsr2_score)
  	allscores3 = alluserguessergames.where(:gsr3_status => "over,over").where(:guesser_id3 => userid)
  	  .collect(&:gsr3_score)    
  	allscores = allscores1 + allscores2 + allscores3
  	if allscores.length < min
  		average = "na"
  	else
			average = (allscores.sum.to_f / allscores.length.to_f).round(2)
		end
  	return average
  end

  def self.combinedrankings(userid, min)
  	alluserguessergames = Game.where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ?", 
  		userid, userid, userid).all
  	allscores1a = alluserguessergames.where(:gsr1_status => "over,over").where(:guesser_id1 => userid)
  	  .collect(&:gsr1_score)
  	allscores2a = alluserguessergames.where(:gsr2_status => "over,over").where(:guesser_id2 => userid)
  	  .collect(&:gsr2_score)
  	allscores3a = alluserguessergames.where(:gsr3_status => "over,over").where(:guesser_id3 => userid)
  	  .collect(&:gsr3_score)    

  	allusergivergames = Game.where(:giver_id => userid).all
  	allscores1b = allusergivergames.where(:gsr1_status => "over,over").collect(&:gsr1_score) || []
  	allscores2b = allusergivergames.where(:gsr2_status => "over,over").collect(&:gsr2_score) || []
  	allscores3b = allusergivergames.where(:gsr3_status => "over,over").collect(&:gsr3_score) || []

  	allscores = allscores1a + allscores2a + allscores3a + allscores1b + allscores2b + allscores3b
  	if allscores.length < min
  		average = "na"
  	else
			average = (allscores.sum.to_f / allscores.length.to_f).round(2)
		end
  	return average
  end
end
