class Game < ApplicationRecord

  def self.combinedrankings(userid, givermin, guessermin, combinedmin)
  	alluserguessergames = Game.where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ? OR guesser_id4 = ? OR guesser_id5 = ? OR guesser_id6 = ?", 
  		userid, userid, userid, userid, userid, userid).all
  	allscores1a = alluserguessergames.where(:gsr1_status => "over,over").where(:guesser_id1 => userid)
  	  .collect(&:gsr1_score)
  	allscores2a = alluserguessergames.where(:gsr2_status => "over,over").where(:guesser_id2 => userid)
  	  .collect(&:gsr2_score)
  	allscores3a = alluserguessergames.where(:gsr3_status => "over,over").where(:guesser_id3 => userid)
  	  .collect(&:gsr3_score)  
  	allscores4a = alluserguessergames.where(:gsr4_status => "over,over").where(:guesser_id4 => userid)
  	  .collect(&:gsr4_score)
  	allscores5a = alluserguessergames.where(:gsr5_status => "over,over").where(:guesser_id5 => userid)
  	  .collect(&:gsr5_score)
  	allscores6a = alluserguessergames.where(:gsr6_status => "over,over").where(:guesser_id6 => userid)
  	  .collect(&:gsr6_score)     

  	allusergivergames = Game.where(:giver_id => userid).all
  	allscores1b = allusergivergames.where(:gsr1_status => "over,over").collect(&:gsr1_score) || []
  	allscores2b = allusergivergames.where(:gsr2_status => "over,over").collect(&:gsr2_score) || []
  	allscores3b = allusergivergames.where(:gsr3_status => "over,over").collect(&:gsr3_score) || []
  	allscores4b = allusergivergames.where(:gsr4_status => "over,over").collect(&:gsr4_score) || []
  	allscores5b = allusergivergames.where(:gsr5_status => "over,over").collect(&:gsr5_score) || []
  	allscores6b = allusergivergames.where(:gsr6_status => "over,over").collect(&:gsr6_score) || []

    # giver average
    allscoresgiver = allscores1b + allscores2b + allscores3b + allscores4b + allscores5b + allscores6b
    if allscoresgiver.length < givermin
      averagegiver = -1
    else
      averagegiver = (allscoresgiver.sum.to_f / allscoresgiver.length.to_f).round(2)
    end

    # guesser average
    allscoresguesser = allscores1a + allscores2a + allscores3a + allscores4a + allscores5a + allscores6a
    if allscoresguesser.length < guessermin
      averageguesser = -1
    else
      averageguesser = (allscoresguesser.sum.to_f / allscoresguesser.length.to_f).round(2)
    end

  	allscores = allscores1a + allscores2a + allscores3a + allscores4a + allscores5a + allscores6a + 
  	  allscores1b + allscores2b + allscores3b + allscores4b + allscores5b + allscores6b
  	if allscores.length < combinedmin
  		average = -1
  	else
			average = (allscores.sum.to_f / allscores.length.to_f).round(2)
		end
  	return [averagegiver, averageguesser, average]
  end

  def self.allcombinedrankings(givermin,guessermin,combinedmin)
    alluserstats = {}
    User.all.each do |user|
      userstats = Game.combinedrankings(user.id,5,5,5)
      alluserstats[user.id] = userstats
    end
    return alluserstats
  end

  def self.userguesserrankings(userid, guesserid, min)
    allusergivergames = Game.where(:giver_id => userid).all
    allscores1 = allusergivergames.where(:guesser_id1 => guesserid).where(:gsr1_status => "over,over").collect(&:gsr1_score) || []
    allscores2 = allusergivergames.where(:guesser_id2 => guesserid).where(:gsr2_status => "over,over").collect(&:gsr2_score) || []
    allscores3 = allusergivergames.where(:guesser_id3 => guesserid).where(:gsr3_status => "over,over").collect(&:gsr3_score) || []
    allscores4 = allusergivergames.where(:guesser_id4 => guesserid).where(:gsr4_status => "over,over").collect(&:gsr4_score) || []
    allscores5 = allusergivergames.where(:guesser_id5 => guesserid).where(:gsr5_status => "over,over").collect(&:gsr5_score) || []
    allscores6 = allusergivergames.where(:guesser_id6 => guesserid).where(:gsr6_status => "over,over").collect(&:gsr6_score) || []
 
    allscores = allscores1 + allscores2 + allscores3 + allscores4 + allscores5 + allscores6
    if allscores.length < min
      average = -1
    else
      average = (allscores.sum.to_f / allscores.length.to_f).round(2)
    end
    return average
  end

  def self.usergiverrankings(userid, giverid, min)
    alluserguessergames = Game.where(:giver_id => giverid).where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ? OR guesser_id4 = ? OR guesser_id5 = ? OR guesser_id6 = ?", 
      userid, userid, userid, userid, userid, userid).all
    allscores1 = alluserguessergames.where(:gsr1_status => "over,over").where(:guesser_id1 => userid)
      .collect(&:gsr1_score)
    allscores2 = alluserguessergames.where(:gsr2_status => "over,over").where(:guesser_id2 => userid)
      .collect(&:gsr2_score)
    allscores3 = alluserguessergames.where(:gsr3_status => "over,over").where(:guesser_id3 => userid)
      .collect(&:gsr3_score)  
    allscores4 = alluserguessergames.where(:gsr4_status => "over,over").where(:guesser_id4 => userid)
      .collect(&:gsr4_score)
    allscores5 = alluserguessergames.where(:gsr5_status => "over,over").where(:guesser_id5 => userid)
      .collect(&:gsr5_score)
    allscores6 = alluserguessergames.where(:gsr6_status => "over,over").where(:guesser_id6 => userid)
      .collect(&:gsr6_score)   
    allscores = allscores1 + allscores2 + allscores3 + allscores4 + allscores5 + allscores6
    if allscores.length < min
      average = -1
    else
      average = (allscores.sum.to_f / allscores.length.to_f).round(2)
    end
    return average
  end

  def self.getchatnumber(userid, gameid)
    thegame = Game.find(gameid)
    chats = 0
    if userid == thegame.giver_id
      chats = thegame.giver_chats
    elsif userid == thegame.guesser_id1
      chats = thegame.gsr1_chats
    elsif userid == thegame.guesser_id2
      chats = thegame.gsr2_chats
    elsif userid == thegame.guesser_id3
      chats = thegame.gsr3_chats
    elsif userid == thegame.guesser_id4
      chats = thegame.gsr4_chats
    elsif userid == thegame.guesser_id5
      chats = thegame.gsr5_chats
    elsif userid == thegame.guesser_id6
      chats = thegame.gsr6_chats
    end
    if chats == 0
      chats = ""
    elsif chats > 9
      chats = "9+"
    else
      chats = chats.to_s
    end
    return chats
  end

  def self.playedgamesgiver(userid)
    allusergivergames = Game.where(:giver_id => userid).all
    return allusergivergames.length
  end

  def self.playedgamesguesser(userid)
    alluserguessergames = Game.where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ? OR guesser_id4 = ? OR guesser_id5 = ? OR guesser_id6 = ?", 
      userid, userid, userid, userid, userid, userid).all
    return alluserguessergames.length
  end

  def self.averageheartspergame(userid, min)
    if User.find(userid).lifetimegamesgiver < min
      avg = -1
    else
      avg = (User.find(userid).lifetimehearts.to_f  / User.find(userid).lifetimegamesgiver.to_f).round(2)
    end
    return avg
  end
end
