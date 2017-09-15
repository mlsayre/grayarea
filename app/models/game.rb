class Game < ApplicationRecord

  def self.combinedrankings(userid, givermin, guessermin, combinedmin, era)
    alluserguessergames = Game.where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ? OR guesser_id4 = ? OR guesser_id5 = ? OR guesser_id6 = ?", 
      userid, userid, userid, userid, userid, userid).all
    if era == true
      timeback = 1.week.ago
    else
  	  timeback = 5.years.ago
    end
  	allscores1a = alluserguessergames.where(:gsr1_status => "over,over").where(:guesser_id1 => userid).where("endtime_gsr1 > ?", timeback)
  	  .collect(&:gsr1_score)
  	allscores2a = alluserguessergames.where(:gsr2_status => "over,over").where(:guesser_id2 => userid).where("endtime_gsr2 > ?", timeback)
  	  .collect(&:gsr2_score)
  	allscores3a = alluserguessergames.where(:gsr3_status => "over,over").where(:guesser_id3 => userid).where("endtime_gsr3 > ?", timeback)
  	  .collect(&:gsr3_score)  
  	allscores4a = alluserguessergames.where(:gsr4_status => "over,over").where(:guesser_id4 => userid).where("endtime_gsr4 > ?", timeback)
  	  .collect(&:gsr4_score)
  	allscores5a = alluserguessergames.where(:gsr5_status => "over,over").where(:guesser_id5 => userid).where("endtime_gsr5 > ?", timeback)
  	  .collect(&:gsr5_score)
  	allscores6a = alluserguessergames.where(:gsr6_status => "over,over").where(:guesser_id6 => userid).where("endtime_gsr6 > ?", timeback)
  	  .collect(&:gsr6_score)     

    allusergivergames = Game.where(:giver_id => userid).all
  	allscores1b = allusergivergames.where(:gsr1_status => "over,over").where("endtime_gsr1 > ?", timeback).collect(&:gsr1_score) || []
  	allscores2b = allusergivergames.where(:gsr2_status => "over,over").where("endtime_gsr2 > ?", timeback).collect(&:gsr2_score) || []
  	allscores3b = allusergivergames.where(:gsr3_status => "over,over").where("endtime_gsr3 > ?", timeback).collect(&:gsr3_score) || []
  	allscores4b = allusergivergames.where(:gsr4_status => "over,over").where("endtime_gsr4 > ?", timeback).collect(&:gsr4_score) || []
  	allscores5b = allusergivergames.where(:gsr5_status => "over,over").where("endtime_gsr5 > ?", timeback).collect(&:gsr5_score) || []
  	allscores6b = allusergivergames.where(:gsr6_status => "over,over").where("endtime_gsr6 > ?", timeback).collect(&:gsr6_score) || []

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

  def self.allcombinedrankings(givermin,guessermin,combinedmin,era)
    alluserstats = {}
    if era == true
      User.all.each do |user|
        userstats = Game.combinedrankings(user.id,5,5,5,true)
        alluserstats[user.id] = userstats
      end
    else
      User.all.each do |user|
        userstats = Game.combinedrankings(user.id,5,5,5,false)
        alluserstats[user.id] = userstats
      end
    end
    return alluserstats
  end

  def self.usersguessersstats(playerid,era)
    userguessstats = {}
    if era == true
      User.all.each do |user|
        userstats = Game.userguesserrankings(playerid, user.id, 5, true)
        userguessstats[user.id] = userstats
      end
    else
      User.all.each do |user|
        userstats = Game.userguesserrankings(playerid, user.id, 5,false)
        userguessstats[user.id] = userstats
      end
    end
    return userguessstats
  end

  def self.userguesserrankings(userid, guesserid, min, era)
    allusergivergames = Game.where(:giver_id => userid).all
    if era == true
      timeback = 1.week.ago
    else
      timeback = 5.years.ago
    end
    allscores1 = allusergivergames.where(:guesser_id1 => guesserid).where(:gsr1_status => "over,over").where("endtime_gsr1 > ?", timeback)
                   .collect(&:gsr1_score) || []
    allscores2 = allusergivergames.where(:guesser_id2 => guesserid).where(:gsr2_status => "over,over").where("endtime_gsr2 > ?", timeback)
                   .collect(&:gsr2_score) || []
    allscores3 = allusergivergames.where(:guesser_id3 => guesserid).where(:gsr3_status => "over,over").where("endtime_gsr3 > ?", timeback)
                   .collect(&:gsr3_score) || []
    allscores4 = allusergivergames.where(:guesser_id4 => guesserid).where(:gsr4_status => "over,over").where("endtime_gsr4 > ?", timeback)
                   .collect(&:gsr4_score) || []
    allscores5 = allusergivergames.where(:guesser_id5 => guesserid).where(:gsr5_status => "over,over").where("endtime_gsr5 > ?", timeback)
                   .collect(&:gsr5_score) || []
    allscores6 = allusergivergames.where(:guesser_id6 => guesserid).where(:gsr6_status => "over,over").where("endtime_gsr6 > ?", timeback)
                   .collect(&:gsr6_score) || []
 
    allscores = allscores1 + allscores2 + allscores3 + allscores4 + allscores5 + allscores6
    if allscores.length < min
      average = -1
    else
      average = (allscores.sum.to_f / allscores.length.to_f).round(2)
    end
    return average
  end

  def self.usersgiversstats(playerid,era)
    userguessstats = {}
    if era == true
      User.all.each do |user|
        userstats = Game.usergiverrankings(playerid, user.id, 5, true)
        userguessstats[user.id] = userstats
      end
    else
      User.all.each do |user|
        userstats = Game.usergiverrankings(playerid, user.id, 5, false)
        userguessstats[user.id] = userstats
      end
    end
    return userguessstats
  end

  def self.usergiverrankings(userid, giverid, min, era)
    alluserguessergames = Game.where(:giver_id => giverid).where("guesser_id1 = ? OR guesser_id2 = ? OR guesser_id3 = ? OR guesser_id4 = ? OR guesser_id5 = ? OR guesser_id6 = ?", 
      userid, userid, userid, userid, userid, userid).all
    if era == true
      timeback = 1.week.ago
    else
      timeback = 5.years.ago
    end
    allscores1 = alluserguessergames.where(:gsr1_status => "over,over").where(:guesser_id1 => userid).where("endtime_gsr1 > ?", timeback)
      .collect(&:gsr1_score)
    allscores2 = alluserguessergames.where(:gsr2_status => "over,over").where(:guesser_id2 => userid).where("endtime_gsr2 > ?", timeback)
      .collect(&:gsr2_score)
    allscores3 = alluserguessergames.where(:gsr3_status => "over,over").where(:guesser_id3 => userid).where("endtime_gsr3 > ?", timeback)
      .collect(&:gsr3_score)  
    allscores4 = alluserguessergames.where(:gsr4_status => "over,over").where(:guesser_id4 => userid).where("endtime_gsr4 > ?", timeback)
      .collect(&:gsr4_score)
    allscores5 = alluserguessergames.where(:gsr5_status => "over,over").where(:guesser_id5 => userid).where("endtime_gsr5 > ?", timeback)
      .collect(&:gsr5_score)
    allscores6 = alluserguessergames.where(:gsr6_status => "over,over").where(:guesser_id6 => userid).where("endtime_gsr6 > ?", timeback)
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

  def self.playedgamesgiver(userid, era)
    if era == true
      allusergivergames = Game.where("created_at > ?", 1.week.ago).where(:giver_id => userid).all
    else
      allusergivergames = Game.where(:giver_id => userid).all
    end
    return allusergivergames.length
  end

  def self.playedgamesguesser(userid, era)
    if era == true
      timeback = 1.week.ago
    else
      timeback = 5.years.ago
    end
    alluserguessergames = Game.where("(guesser_id1 = ? AND endtime_gsr1 > ?) OR (guesser_id2 = ? AND endtime_gsr2 > ?) OR (guesser_id3 = ? AND endtime_gsr3 > ?) OR (guesser_id4 = ? AND endtime_gsr4 > ?) OR (guesser_id5 = ? AND endtime_gsr5 > ?) OR (guesser_id6 = ? AND endtime_gsr6 > ?)", 
        userid, timeback, userid, timeback, userid, timeback, userid, timeback, userid, timeback, userid, timeback).all
    return alluserguessergames.length
  end

  def self.averageheartspergame(userid, min, era)
    if era == true
      availgames = Game.where("created_at > ?", 1.week.ago).where(:giver_id => userid)
      totalhearts = 0
      availgames.each do |game|
        gmhearts = game.gsr1_heart + game.gsr2_heart + game.gsr3_heart + game.gsr4_heart + 
          game.gsr5_heart + game.gsr6_heart
        totalhearts = totalhearts + gmhearts
      end
      if availgames.count < min 
        avg = -1
      else
        avg = (totalhearts.to_f / availgames.count.to_f).round(2)
      end
    else
      if User.find(userid).lifetimegamesgiver < min
        avg = -1
      else
        avg = (User.find(userid).lifetimehearts.to_f  / User.find(userid).lifetimegamesgiver.to_f).round(2)
      end
    end
    return avg
  end

  def self.checkspecialfeats(userid, giverid, type)
    curruser = User.find(userid)
    giveuser = User.find(giverid)
    featindexesguesser = {"allsix1" => 1, "allsix5" => 5, "allsix20" => 9, "allsix50" => 12, "allsix100" => 15,
                          "scorehundred1" => 3, "scorehundred5" => 7, "scorehundred20" => 10, "scorehundred50" => 13, 
                          "scorehundred100" => 16, "scoretwohundred" => 18, "perfect1" => 19, "perfect3" => 20, 
                          "perfect12" => 21, "perfect30" => 22, "perfect60" => 23}
    featindexesgiver = {"allsix1" => 1, "allsix5" => 6, "allsix20" => 11, "allsix50" => 15, "allsix100" => 19,
                        "scorehundred1" => 3, "scorehundred5" => 8, "scorehundred20" => 12, "scorehundred50" => 16, 
                        "scorehundred100" => 20, "scoretwohundred" => 23, "nospoil5" => 4, "nospoil10" => 9, "nospoil20" => 13,
                        "nospoil30" => 17, "nospoil50" => 22, "perfect1" => 24, "perfect3" => 25, "perfect12" => 26, 
                        "perfect30" => 27, "perfect60" => 28}
    featpointsguesser = {"allsix1" => 20, "allsix5" => 30, "allsix20" => 40, "allsix50" => 60, "allsix100" => 100,
                          "scorehundred1" => 20, "scorehundred5" => 30, "scorehundred20" => 40, "scorehundred50" => 60, 
                          "scorehundred100" => 100, "scoretwohundred" => 300, "perfect1" => 20, "perfect3" => 30, 
                          "perfect12" => 40, "perfect30" => 60, "perfect60" => 100}
    featpointsgiver = {"allsix1" => 20, "allsix5" => 40, "allsix20" => 50, "allsix50" => 80, "allsix100" => 120,
                        "scorehundred1" => 20, "scorehundred5" => 40, "scorehundred20" => 50, "scorehundred50" => 80, 
                        "scorehundred100" => 120, "scoretwohundred" => 300, "nospoil5" => 20, "nospoil10" => 50, 
                        "nospoil20" => 70, "nospoil30" => 100, "nospoil50" => 250, "perfect1" => 20, "perfect3" => 40, 
                        "perfect12" => 50, "perfect30" => 80, "perfect60" => 120}

    if type == "twohundred"
      newarr = curruser.statguesserstatus
      newarr[featindexesguesser["scoretwohundred"]] = curruser.statguesserscoretwohundred * 300
      curruser.update(:statguesserstatus => newarr)
      newarr = curruser.statguessernotify
      newarr[featindexesguesser["scoretwohundred"]] = 1
      curruser.update(:statguessernotify => newarr)
      #now do for giver
      newarr = giveuser.statgiverstatus
      newarr[featindexesgiver["scoretwohundred"]] = giveuser.statgiverscoretwohundred * 300
      giveuser.update(:statgiverstatus => newarr)
      newarr = giveuser.statgivernotify
      newarr[featindexesgiver["scoretwohundred"]] = 1
      giveuser.update(:statgivernotify => newarr)
    elsif type == "hundred"
      if curruser.statguesserstatus[featindexesguesser["scorehundred100"]] == 0 && curruser.statguesserscorehundred > 99
        Game.statarrayupdateguesser(featindexesguesser["scorehundred100"], featpointsguesser["scorehundred100"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["scorehundred50"]] == 0 && curruser.statguesserscorehundred > 49
        Game.statarrayupdateguesser(featindexesguesser["scorehundred50"], featpointsguesser["scorehundred50"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["scorehundred20"]] == 0 && curruser.statguesserscorehundred > 19
        Game.statarrayupdateguesser(featindexesguesser["scorehundred20"], featpointsguesser["scorehundred20"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["scorehundred5"]] == 0 && curruser.statguesserscorehundred > 4
        Game.statarrayupdateguesser(featindexesguesser["scorehundred5"], featpointsguesser["scorehundred5"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["scorehundred1"]] == 0 && curruser.statguesserscorehundred > 0
        Game.statarrayupdateguesser(featindexesguesser["scorehundred1"], featpointsguesser["scorehundred1"], curruser)
      end
      if giveuser.statgiverstatus[featindexesgiver["scorehundred100"]] == 0 && giveuser.statgiverscorehundred > 99
        Game.statarrayupdategiver(featindexesgiver["scorehundred100"], featpointsgiver["scorehundred100"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["scorehundred50"]] == 0 && giveuser.statgiverscorehundred > 49
        Game.statarrayupdategiver(featindexesgiver["scorehundred50"], featpointsgiver["scorehundred50"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["scorehundred20"]] == 0 && giveuser.statgiverscorehundred > 19
        Game.statarrayupdategiver(featindexesgiver["scorehundred20"], featpointsgiver["scorehundred20"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["scorehundred5"]] == 0 && giveuser.statgiverscorehundred > 4
        Game.statarrayupdategiver(featindexesgiver["scorehundred5"], featpointsgiver["scorehundred5"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["scorehundred1"]] == 0 && giveuser.statgiverscorehundred > 0
        Game.statarrayupdategiver(featindexesgiver["scorehundred1"], featpointsgiver["scorehundred1"], giveuser)
      end
    elsif type == "spoilstreak"
      if giveuser.statgiverstatus[featindexesgiver["nospoil50"]] == 0 && giveuser.statgivernospoilers > 49
        Game.statarrayupdategiver(featindexesgiver["nospoil50"], featpointsgiver["nospoil50"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["nospoil30"]] == 0 && giveuser.statgivernospoilers > 29
        Game.statarrayupdategiver(featindexesgiver["nospoil30"], featpointsgiver["nospoil30"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["nospoil20"]] == 0 && giveuser.statgivernospoilers > 19
        Game.statarrayupdategiver(featindexesgiver["nospoil20"], featpointsgiver["nospoil20"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["nospoil10"]] == 0 && giveuser.statgivernospoilers > 9
        Game.statarrayupdategiver(featindexesgiver["nospoil10"], featpointsgiver["nospoil10"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["nospoil5"]] == 0 && giveuser.statgivernospoilers > 4
        Game.statarrayupdategiver(featindexesgiver["nospoil5"], featpointsgiver["nospoil5"], giveuser)
      end
    elsif type =="allsix"
      if curruser.statguesserstatus[featindexesguesser["allsix100"]] == 0 && curruser.statguesserallsix > 99
        Game.statarrayupdateguesser(featindexesguesser["allsix100"], featpointsguesser["allsix100"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["allsix50"]] == 0 && curruser.statguesserallsix > 49
        Game.statarrayupdateguesser(featindexesguesser["allsix50"], featpointsguesser["allsix50"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["allsix20"]] == 0 && curruser.statguesserallsix > 19
        Game.statarrayupdateguesser(featindexesguesser["allsix20"], featpointsguesser["allsix20"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["allsix5"]] == 0 && curruser.statguesserallsix > 4
        Game.statarrayupdateguesser(featindexesguesser["allsix5"], featpointsguesser["allsix5"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["allsix1"]] == 0 && curruser.statguesserallsix > 0
        Game.statarrayupdateguesser(featindexesguesser["allsix1"], featpointsguesser["allsix1"], curruser)
      end
      if giveuser.statgiverstatus[featindexesgiver["allsix100"]] == 0 && giveuser.statgiverallsix > 99
        Game.statarrayupdategiver(featindexesgiver["allsix100"], featpointsgiver["allsix100"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["allsix50"]] == 0 && giveuser.statgiverallsix > 49
        Game.statarrayupdategiver(featindexesgiver["allsix50"], featpointsgiver["allsix50"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["allsix20"]] == 0 && giveuser.statgiverallsix > 19
        Game.statarrayupdategiver(featindexesgiver["allsix20"], featpointsgiver["allsix20"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["allsix5"]] == 0 && giveuser.statgiverallsix > 4
        Game.statarrayupdategiver(featindexesgiver["allsix5"], featpointsgiver["allsix5"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["allsix1"]] == 0 && giveuser.statgiverallsix > 0
        Game.statarrayupdategiver(featindexesgiver["allsix1"], featpointsgiver["allsix1"], giveuser)
      end
    elsif type == "perfect"
      if curruser.statguesserstatus[featindexesguesser["perfect60"]] == 0 && curruser.statguesserperfect > 59
        Game.statarrayupdateguesser(featindexesguesser["perfect60"], featpointsguesser["perfect60"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["perfect30"]] == 0 && curruser.statguesserperfect > 29
        Game.statarrayupdateguesser(featindexesguesser["perfect30"], featpointsguesser["perfect30"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["perfect12"]] == 0 && curruser.statguesserperfect > 11
        Game.statarrayupdateguesser(featindexesguesser["perfect12"], featpointsguesser["perfect12"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["perfect3"]] == 0 && curruser.statguesserperfect > 2
        Game.statarrayupdateguesser(featindexesguesser["perfect3"], featpointsguesser["perfect3"], curruser)
      elsif curruser.statguesserstatus[featindexesguesser["perfect1"]] == 0 && curruser.statguesserperfect > 0
        Game.statarrayupdateguesser(featindexesguesser["perfect1"], featpointsguesser["perfect1"], curruser)
      end
      if giveuser.statgiverstatus[featindexesgiver["perfect60"]] == 0 && giveuser.statgiverperfect > 59
        Game.statarrayupdategiver(featindexesgiver["perfect60"], featpointsgiver["perfect60"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["perfect30"]] == 0 && giveuser.statgiverperfect > 29
        Game.statarrayupdategiver(featindexesgiver["perfect30"], featpointsgiver["perfect30"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["perfect12"]] == 0 && giveuser.statgiverperfect > 11
        Game.statarrayupdategiver(featindexesgiver["perfect12"], featpointsgiver["perfect12"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["perfect3"]] == 0 && giveuser.statgiverperfect > 2
        Game.statarrayupdategiver(featindexesgiver["perfect3"], featpointsgiver["perfect3"], giveuser)
      elsif giveuser.statgiverstatus[featindexesgiver["perfect1"]] == 0 && giveuser.statgiverperfect > 0
        Game.statarrayupdategiver(featindexesgiver["perfect1"], featpointsgiver["perfect1"], giveuser)
      end
    end
  end

  def self.checkfeats(userid, giverid, who)
    curruser = User.find(userid)
    giveuser = User.find(giverid)
    featindexesguesser = {"guessin3" => 0, "guessin6" => 2, "guessin20" => 4, "guessin50" => 6, "guessin100" => 8, 
                          "guessin150" => 11, "guessin250" => 14, "guessin500" => 17}
    featindexesgiver = {"givein1" => 0, "givein5" => 2, "givein20" => 5, "givein50" => 7, "givein100" => 10, 
                        "givein150" => 14, "givein250" => 18, "givein500" => 21}
    featpointsguesser = {"guessin3" => 10, "guessin6" => 20, "guessin20" => 30, "guessin50" => 30, "guessin100" => 40, 
                         "guessin150" => 60, "guessin250" => 70, "guessin500" => 150}
    featpointsgiver = {"givein1" => 10, "givein5" => 20, "givein20" => 30, "givein50" => 40, "givein100" => 50, 
                       "givein150" => 70, "givein250" => 100, "givein500" => 200}

    if who == "guesser"
      if curruser.statguesserstatus[featindexesguesser["guessin500"]] == 0 && curruser.lifetimegamesguesser > 499
        Game.statarrayupdateguesser(featindexesguesser["guessin500"], featpointsguesser["guessin500"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin250"]] == 0 && curruser.lifetimegamesguesser > 249
        Game.statarrayupdateguesser(featindexesguesser["guessin250"], featpointsguesser["guessin250"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin150"]] == 0 && curruser.lifetimegamesguesser > 149
        Game.statarrayupdateguesser(featindexesguesser["guessin150"], featpointsguesser["guessin150"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin100"]] == 0 && curruser.lifetimegamesguesser > 99
        Game.statarrayupdateguesser(featindexesguesser["guessin100"], featpointsguesser["guessin100"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin50"]] == 0 && curruser.lifetimegamesguesser > 49
        Game.statarrayupdateguesser(featindexesguesser["guessin50"], featpointsguesser["guessin50"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin20"]] == 0 && curruser.lifetimegamesguesser > 19
        Game.statarrayupdateguesser(featindexesguesser["guessin20"], featpointsguesser["guessin20"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin6"]] == 0 && curruser.lifetimegamesguesser > 5
        Game.statarrayupdateguesser(featindexesguesser["guessin6"], featpointsguesser["guessin6"], curruser)
      end
      if curruser.statguesserstatus[featindexesguesser["guessin3"]] == 0 && curruser.lifetimegamesguesser > 2
        Game.statarrayupdateguesser(featindexesguesser["guessin3"], featpointsguesser["guessin3"], curruser)
      end
    end
    if who == "giver"
      if giveuser.statguesserstatus[featindexesgiver["givein500"]] == 0 && giveuser.lifetimegamesgiver > 499
        Game.statarrayupdategiver(featindexesgiver["givein500"], featpointsgiver["givein500"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein250"]] == 0 && giveuser.lifetimegamesgiver > 249
        Game.statarrayupdategiver(featindexesgiver["givein250"], featpointsgiver["givein250"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein150"]] == 0 && giveuser.lifetimegamesgiver > 149
        Game.statarrayupdategiver(featindexesgiver["givein150"], featpointsgiver["givein150"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein100"]] == 0 && giveuser.lifetimegamesgiver > 99
        Game.statarrayupdategiver(featindexesgiver["givein100"], featpointsgiver["givein100"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein50"]] == 0 && giveuser.lifetimegamesgiver > 49
        Game.statarrayupdategiver(featindexesgiver["givein50"], featpointsgiver["givein50"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein20"]] == 0 && giveuser.lifetimegamesgiver > 19
        Game.statarrayupdategiver(featindexesgiver["givein20"], featpointsgiver["givein20"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein5"]] == 0 && giveuser.lifetimegamesgiver > 4
        Game.statarrayupdategiver(featindexesgiver["givein5"], featpointsgiver["givein5"], giveuser)
      end
      if giveuser.statgiverstatus[featindexesgiver["givein1"]] == 0 && giveuser.lifetimegamesgiver > 0
        Game.statarrayupdategiver(featindexesgiver["givein1"], featpointsgiver["givein1"], giveuser)
      end
    end
  end

  def self.statarrayupdateguesser(guessind, guesspts, curruser)
    newarr = curruser.statguesserstatus
    newarr[guessind] = guesspts
    curruser.update(:statguesserstatus => newarr)
    newarr = curruser.statguessernotify
    newarr[guessind] = 1
    curruser.update(:statguessernotify => newarr)
  end

  def self.statarrayupdategiver(giveind, givepts, giveuser)
    newarr = giveuser.statgiverstatus
    newarr[giveind] = givepts
    giveuser.update(:statgiverstatus => newarr)
    newarr = giveuser.statgivernotify
    newarr[giveind] = 1
    giveuser.update(:statgivernotify => newarr)
  end
end
