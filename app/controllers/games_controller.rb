class GamesController < ApplicationController
	before_action :set_game, only: [:show]
	# GET /games/new
  def new
    @game = Game.new

    if user_signed_in?
      @featcount = current_user.statgivernotify.sum + current_user.statguessernotify.sum 

      @gameguesser = Game.where.not(:giver_id => "").first || 1

      @gamesgiver = Game.where(:giver_id => current_user.id).order('created_at DESC').all
      @gamesguesser = Game.where(:guesser_id1 => current_user.id)
        .or(Game.where(:guesser_id2 => current_user.id))
        .or(Game.where(:guesser_id3 => current_user.id))
        .or(Game.where(:guesser_id4 => current_user.id))
        .or(Game.where(:guesser_id5 => current_user.id))
        .or(Game.where(:guesser_id6 => current_user.id)).order('updated_at DESC').all

      @gamesguesserlist = @gamesguesser.page(params[:page_2]).per(8)
      @gamesgiverlist = Kaminari.paginate_array(@gamesgiver).page(params[:page]).per(8)
    end
  end

  def startguesser
    if user_signed_in? == false
      @game = Game.where(:gamestatus => "done").all.sample(1)

      respond_to do |format|
        format.html { redirect_to @game, notice: 'Have fun guessing!' }
        format.json { render :show, status: :created, location: @game }
      end
    else
    	@availgames = Game.where.not(:giver_id => current_user.id, :guesser_id1 => current_user.id, 
    		:guesser_id2 => current_user.id, :guesser_id3 => current_user.id, :guesser_id4 => current_user.id, 
        :guesser_id5 => current_user.id, :guesser_id6 => current_user.id).where(:gamestatus => "guess")

    	if @availgames.length > 0

  	  	@game = @availgames.order("RANDOM()").first

  	  	if @game.guesser_id1 == 0
  	  		@game.update(:guesser_id1 => current_user.id)
  	  	elsif @game.guesser_id2 == 0
  	  		@game.update(:guesser_id2 => current_user.id)
  	  	elsif @game.guesser_id3 == 0
  	  		@game.update(:guesser_id3 => current_user.id)
        elsif @game.guesser_id4 == 0
          @game.update(:guesser_id4 => current_user.id)
        elsif @game.guesser_id5 == 0
          @game.update(:guesser_id5 => current_user.id)
        elsif @game.guesser_id6 == 0
          @game.update(:guesser_id6 => current_user.id)
  	  	end

  	    respond_to do |format|
  	      format.html { redirect_to @game, notice: '' }
  	      format.json { render :show, status: :created, location: @game }
  	    end

  	  else
  	  	@game = Game.new

  	  	respond_to do |format|
  	      format.html { redirect_to main_path, notice: 'No games available to play. Maybe start a game or two while you wait!' }
  	      format.json { render :show}
  	    end
  	    flash[:notice] = 'No games available to play. Maybe start a game or two while you wait?'
      end
	  end

  end

  def updategame
    @thisgame = Game.find(params[:game_id])

    if params[:hint1words] == nil
      params[:hint1words] = []
    end
    if params[:hint2words] == nil
      params[:hint2words] = []
    end
    if params[:hint3words] == nil
      params[:hint3words] = []
    end

    if current_user.id == @thisgame.guesser_id1
      @thisgame.update(:gsr1_words => params[:guessedwords], :gsr1_status => params[:guessstatus], 
        :gsr1_spoiler => params[:gamespoiled], :gsr1_score => params[:gamescore], :gsr1_h1words => params[:hint1words], 
        :gsr1_h2words => params[:hint2words], :gsr1_h3words => params[:hint3words])
    elsif current_user.id == @thisgame.guesser_id2
      @thisgame.update(:gsr2_words => params[:guessedwords], :gsr2_status => params[:guessstatus], 
        :gsr2_spoiler => params[:gamespoiled], :gsr2_score => params[:gamescore], :gsr2_h1words => params[:hint1words], 
        :gsr2_h2words => params[:hint2words], :gsr2_h3words => params[:hint3words])
    elsif current_user.id == @thisgame.guesser_id3
      @thisgame.update(:gsr3_words => params[:guessedwords], :gsr3_status => params[:guessstatus], 
        :gsr3_spoiler => params[:gamespoiled], :gsr3_score => params[:gamescore], :gsr3_h1words => params[:hint1words], 
        :gsr3_h2words => params[:hint2words], :gsr3_h3words => params[:hint3words])
    elsif current_user.id == @thisgame.guesser_id4
      @thisgame.update(:gsr4_words => params[:guessedwords], :gsr4_status => params[:guessstatus], 
        :gsr4_spoiler => params[:gamespoiled], :gsr4_score => params[:gamescore], :gsr4_h1words => params[:hint1words], 
        :gsr4_h2words => params[:hint2words], :gsr4_h3words => params[:hint3words])
    elsif current_user.id == @thisgame.guesser_id5
      @thisgame.update(:gsr5_words => params[:guessedwords], :gsr5_status => params[:guessstatus], 
        :gsr5_spoiler => params[:gamespoiled], :gsr5_score => params[:gamescore], :gsr5_h1words => params[:hint1words], 
        :gsr5_h2words => params[:hint2words], :gsr5_h3words => params[:hint3words])
    elsif current_user.id == @thisgame.guesser_id6
      @thisgame.update(:gsr6_words => params[:guessedwords], :gsr6_status => params[:guessstatus], 
        :gsr6_spoiler => params[:gamespoiled], :gsr6_score => params[:gamescore], :gsr6_h1words => params[:hint1words], 
        :gsr6_h2words => params[:hint2words], :gsr6_h3words => params[:hint3words])
    end

    if params[:guessstatus] == "over,over" && current_user.id == @thisgame.guesser_id6
      @thisgame.update(:gamestatus => "done")
      current_user.increment!(:lifetimegamesguesser, by = 1)
      News.create!(:newstype => 2, :targetuser_id => @thisgame.giver_id, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id, :points => params[:gamescore])
      usernews = News.where(:targetuser_id => @thisgame.giver_id).all
      usernews.order('created_at DESC').offset(20).destroy_all
    elsif params[:guessstatus] == "over,over"
      current_user.increment!(:lifetimegamesguesser, by = 1)
      News.create!(:newstype => 1, :targetuser_id => @thisgame.giver_id, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id, :points => params[:gamescore])
      usernews = News.where(:targetuser_id => @thisgame.giver_id).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end

    #stats
    if params[:guessstatus] == "over,over"
      if params[:gamescore].to_i == 200
        User.find(current_user.id).increment!(:statguesserscoretwohundred, by = 1)
        User.find(@thisgame.giver_id).increment!(:statgiverscoretwohundred, by = 1)
        Game.checkspecialfeats(current_user.id, @thisgame.giver_id, "twohundred")
      end
      if params[:gamescore].to_i > 99
        User.find(current_user.id).increment!(:statguesserscorehundred, by = 1)
        User.find(@thisgame.giver_id).increment!(:statgiverscorehundred, by = 1)
        Game.checkspecialfeats(current_user.id, @thisgame.giver_id, "hundred")
      end
      if params[:gamespoiled].to_i == 0
        User.find(@thisgame.giver_id).increment!(:statgivernospoilers, by = 1)
        newstreak = User.find(@thisgame.giver_id).statgivernospoilers
        if newstreak > User.find(@thisgame.giver_id).statalltimegiverstreak
          User.find(@thisgame.giver_id).update(:statalltimegiverstreak => newstreak)
        end
        Game.checkspecialfeats(current_user.id, @thisgame.giver_id, "spoilstreak")
      elsif params[:gamespoiled].to_i == 1
        User.find(@thisgame.giver_id).update(:statgivernospoilers => 0)
        Game.checkspecialfeats(current_user.id, @thisgame.giver_id, "spoilstreak")
      end
      if params[:hint1words].length + params[:hint2words].length + params[:hint3words].length == 6
        User.find(current_user.id).increment!(:statguesserallsix, by = 1)
        User.find(@thisgame.giver_id).increment!(:statgiverallsix, by = 1)
        Game.checkspecialfeats(current_user.id, @thisgame.giver_id, "allsix")
        if params[:guessedwords].length == 6
          User.find(current_user.id).increment!(:statguesserperfect, by = 1)
          User.find(@thisgame.giver_id).increment!(:statgiverperfect, by = 1)
          Game.checkspecialfeats(current_user.id, @thisgame.giver_id, "perfect")
        end
      end
      Game.checkfeats(current_user.id, @thisgame.giver_id, "guesser")
      
      if current_user.id == @thisgame.guesser_id1
        @thisgame.update(:endtime_gsr1 => Time.current)
      elsif current_user.id == @thisgame.guesser_id2
        @thisgame.update(:endtime_gsr2 => Time.current)
      elsif current_user.id == @thisgame.guesser_id3
        @thisgame.update(:endtime_gsr3 => Time.current)
      elsif current_user.id == @thisgame.guesser_id4
        @thisgame.update(:endtime_gsr4 => Time.current)
      elsif current_user.id == @thisgame.guesser_id5
        @thisgame.update(:endtime_gsr5 => Time.current)
      elsif current_user.id == @thisgame.guesser_id6
        @thisgame.update(:endtime_gsr6 => Time.current)
      end
    end
    
    #render body: nil
    respond_to do |format|
      format.json  { render json: {} , status: 200 }
    end
  end

  def addheart
    @thisgame = Game.find(params[:game_id])
    @gamegiver = User.find(@thisgame.giver_id)
    @gamegiver.increment!(:lifetimehearts, by = 1).increment!(:heartnotify, by = 1)

    if current_user.id == @thisgame.guesser_id1
      @thisgame.update(:gsr1_heart => params[:heartgiven])
      heartscore = @thisgame.gsr1_score
    elsif current_user.id == @thisgame.guesser_id2
      @thisgame.update(:gsr2_heart => params[:heartgiven])
      heartscore = @thisgame.gsr2_score
    elsif current_user.id == @thisgame.guesser_id3
      @thisgame.update(:gsr3_heart => params[:heartgiven])
      heartscore = @thisgame.gsr3_score
    elsif current_user.id == @thisgame.guesser_id4
      @thisgame.update(:gsr4_heart => params[:heartgiven])
      heartscore = @thisgame.gsr4_score
    elsif current_user.id == @thisgame.guesser_id5
      @thisgame.update(:gsr5_heart => params[:heartgiven])
      heartscore = @thisgame.gsr5_score
    elsif current_user.id == @thisgame.guesser_id6
      @thisgame.update(:gsr6_heart => params[:heartgiven])
      heartscore = @thisgame.gsr6_score
    end

    News.create!(:newstype => 3, :targetuser_id => @thisgame.giver_id, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id, :points => heartscore)
    usernews = News.where(:targetuser_id => @thisgame.giver_id).all
    usernews.order('created_at DESC').offset(20).destroy_all

    respond_to do |format|
      format.json  { render json: {} , status: 200 }
    end
  end

  def resetheartnotify
    current_user.update(:heartnotify => 0)

    render body: nil
  end

  # POST /games
  # POST /games.json
  def create
    @posgames = Game.where(:giver_id => current_user.id).where(:gamestatus => "give")
    if @posgames.count > 0
      @game = @posgames.first

      respond_to do |format|
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
        format.json { render :show, status: :created, location: @game }
      end
    else
    	@allwords = File.new("config/wordlist").readlines.sample(15)
    	@allwords.each do |w|
      	w.include?("\n") ? w.gsub!("\n", "").upcase! : w.upcase!
  		end
  		@correctwords = @allwords.sample(7)
  		@loseword = @correctwords[0]
  		@correctwords.slice!(0)

  		@game = Game.new
  		@game.update(:allwords => @allwords, :gamestatus => "give", :correctwords => @correctwords, 
  			:loseword => @loseword, :giver_id => current_user.id)

  		respond_to do |format|
        if @game.save
          format.html { redirect_to @game, notice: 'Game was successfully created.' }
          format.json { render :show, status: :created, location: @game }
        else
          format.html { render :new }
          format.json { render json: @game.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # GET /games/1
  # GET /games/1.json
  def show
    if user_signed_in? == false
      gon.signedin = false
      @allthewords = @game.allwords
      @badword = @game.loseword
      @targetwords = @game.correctwords
      badindex = @allthewords.index(@badword)
      @badarray = [7,3,12,8,2,4,5,8,11,10,1,2,6,3,5,9,2]
      @badarray.insert(8, badindex)
      @targetarray = [4,8,9,11,6,5,10,7,12,6,2,1,9,5,8,3,11,4,10,6,1,7]
      temptarg = []
      @targetwords.each do |word|
        ind = @allthewords.index(word)
        temptarg.push(ind)
      end
      temptarg.each do |targ|
        @targetarray.insert(12, targ)
      end
      gon.allwords = @allthewords
      gon.badword = @badarray
      gon.targetwords = @targetarray
      gon.hintword1 = @game.hintword1
      gon.hintword2 = @game.hintword2
      gon.hintword3 = @game.hintword3
      gon.hintnum1 = @game.hintnum1
      gon.hintnum2 = @game.hintnum2
      gon.hintnum3 = @game.hintnum3
      gon.sound = 0
      @chatshow = false

      # underway vars
      gon.g1words = @game.gsr1_words
      gon.g2words = @game.gsr2_words
      gon.g3words = @game.gsr3_words
      gon.g4words = @game.gsr4_words
      gon.g5words = @game.gsr5_words
      gon.g6words = @game.gsr6_words

      @cheatnum = @game.gsr1_cheat + @game.gsr2_cheat + @game.gsr3_cheat + @game.gsr4_cheat + @game.gsr5_cheat + 
                  @game.gsr6_cheat
      gon.currentcheatnum = @cheatnum

      gon.guessedwords = []
      gon.wordsh1 = []
      gon.wordsh2 = []
      gon.wordsh3 = []
      gon.guessstatus = "hint1,word1"
      @gsrstatus = "hint1,word1"
      gon.spoiler = 0
      gon.guessernum = "1"
      gon.playerscore = 0
      gon.heartstatus = 0
      @cheatstatus = 0
      @chatshow = false
    else
      gon.signedin = true
    	@allthewords = @game.allwords
    	@badword = @game.loseword
    	@targetwords = @game.correctwords
      badindex = @allthewords.index(@badword)
      @badarray = [7,3,12,8,2,4,5,8,11,10,1,2,6,3,5,9,2]
      @badarray.insert(8, badindex)
      @targetarray = [4,8,9,11,6,5,10,7,12,6,2,1,9,5,8,3,11,4,10,6,1,7]
      temptarg = []
      @targetwords.each do |word|
        ind = @allthewords.index(word)
        temptarg.push(ind)
      end
      temptarg.each do |targ|
        @targetarray.insert(12, targ)
      end
      gon.allwords = @allthewords
    	gon.badword = @badarray
    	gon.targetwords = @targetarray
    	gon.hintword1 = @game.hintword1
    	gon.hintword2 = @game.hintword2
      gon.hintword3 = @game.hintword3
    	gon.hintnum1 = @game.hintnum1
    	gon.hintnum2 = @game.hintnum2
      gon.hintnum3 = @game.hintnum3
      gon.sound = current_user.sound
      @chatshow = false

      # underway vars
      gon.g1words = @game.gsr1_words
      gon.g2words = @game.gsr2_words
      gon.g3words = @game.gsr3_words
      gon.g4words = @game.gsr4_words
      gon.g5words = @game.gsr5_words
      gon.g6words = @game.gsr6_words

      @cheatnum = @game.gsr1_cheat + @game.gsr2_cheat + @game.gsr3_cheat + @game.gsr4_cheat + @game.gsr5_cheat + 
                  @game.gsr6_cheat
      gon.currentcheatnum = @cheatnum

    	if current_user.id == @game.guesser_id1
    		gon.guessedwords = @game.gsr1_words
        gon.wordsh1 = @game.gsr1_h1words
        gon.wordsh2 = @game.gsr1_h2words
        gon.wordsh3 = @game.gsr1_h3words
    		gon.guessstatus = @game.gsr1_status
        @gsrstatus = @game.gsr1_status
        gon.spoiler = @game.gsr1_spoiler
        gon.guessernum = "1"
        gon.playerscore = @game.gsr1_score
        gon.heartstatus = @game.gsr1_heart
        @cheatstatus = @game.gsr1_cheat
        if @game.gsr1_status == "over,over" && @game.gamestatus != "give"
          @chatshow = true
        end
    	elsif current_user.id == @game.guesser_id2
    		gon.guessedwords = @game.gsr2_words
        gon.wordsh1 = @game.gsr2_h1words
        gon.wordsh2 = @game.gsr2_h2words
        gon.wordsh3 = @game.gsr2_h3words
    		gon.guessstatus = @game.gsr2_status
        @gsrstatus = @game.gsr2_status
        gon.spoiler = @game.gsr2_spoiler
        gon.guessernum = "2"
        gon.playerscore = @game.gsr2_score
        gon.heartstatus = @game.gsr2_heart
        @cheatstatus = @game.gsr2_cheat
        if @game.gsr2_status == "over,over" && @game.gamestatus != "give"
          @chatshow = true
        end
    	elsif current_user.id == @game.guesser_id3
    		gon.guessedwords = @game.gsr3_words
        gon.wordsh1 = @game.gsr3_h1words
        gon.wordsh2 = @game.gsr3_h2words
        gon.wordsh3 = @game.gsr3_h3words
    		gon.guessstatus = @game.gsr3_status
        @gsrstatus = @game.gsr3_status
        gon.spoiler = @game.gsr3_spoiler
        gon.guessernum = "3"
        gon.playerscore = @game.gsr3_score
        gon.heartstatus = @game.gsr3_heart
        @cheatstatus = @game.gsr3_cheat
        if @game.gsr3_status == "over,over" && @game.gamestatus != "give"
          @chatshow = true
        end
      elsif current_user.id == @game.guesser_id4
        gon.guessedwords = @game.gsr4_words
        gon.wordsh1 = @game.gsr4_h1words
        gon.wordsh2 = @game.gsr4_h2words
        gon.wordsh3 = @game.gsr4_h3words
        gon.guessstatus = @game.gsr4_status
        @gsrstatus = @game.gsr4_status
        gon.spoiler = @game.gsr4_spoiler
        gon.guessernum = "4"
        gon.playerscore = @game.gsr4_score
        gon.heartstatus = @game.gsr4_heart
        @cheatstatus = @game.gsr4_cheat
        if @game.gsr4_status == "over,over" && @game.gamestatus != "give"
          @chatshow = true
        end
      elsif current_user.id == @game.guesser_id5
        gon.guessedwords = @game.gsr5_words
        gon.wordsh1 = @game.gsr5_h1words
        gon.wordsh2 = @game.gsr5_h2words
        gon.wordsh3 = @game.gsr5_h3words
        gon.guessstatus = @game.gsr5_status
        @gsrstatus = @game.gsr5_status
        gon.spoiler = @game.gsr5_spoiler
        gon.guessernum = "5"
        gon.playerscore = @game.gsr5_score
        gon.heartstatus = @game.gsr5_heart
        @cheatstatus = @game.gsr5_cheat
        if @game.gsr5_status == "over,over" && @game.gamestatus != "give"
          @chatshow = true
        end
      elsif current_user.id == @game.guesser_id6
        gon.guessedwords = @game.gsr6_words
        gon.wordsh1 = @game.gsr6_h1words
        gon.wordsh2 = @game.gsr6_h2words
        gon.wordsh3 = @game.gsr6_h3words
        gon.guessstatus = @game.gsr6_status
        @gsrstatus = @game.gsr6_status
        gon.spoiler = @game.gsr6_spoiler
        gon.guessernum = "6"
        gon.playerscore = @game.gsr6_score
        gon.heartstatus = @game.gsr6_heart
        @cheatstatus = @game.gsr6_cheat
        if @game.gsr6_status == "over,over" && @game.gamestatus != "give"
          @chatshow = true  
        end
    	end

      if current_user.id == @game.giver_id && @game.gamestatus != "give"
        @chatshow = true
      end
    end
  end

  def submithints
  	@thisgame = Game.find(params[:game_id])
		@thisgame.update(:giver_id => current_user.id, :hintword1 => params[:word1], :gamestatus => "guess",
			:hintword2 => params[:word2], :hintnum1 => params[:word1num], :hintnum2 => params[:word2num], 
      :hintword3 => params[:word3], :hintnum3 => params[:word3num])
    current_user.increment!(:lifetimegamesgiver, by = 1)
    if current_user.giverdeletegamesleft > 0
      current_user.decrement!(:giverdeletegamesleft, by = 1)
    end

    Game.checkfeats(current_user.id, current_user.id, "giver")

		render body: nil
  end

  def givingdeletegame
    @thisgame = Game.find(params[:game_id])
    @thisgame.delete

    current_user.update(:giverdeletegamesleft => 3)

    respond_to do |format|
      format.json  { render json: {} , status: 200 }
    end

    flash[:notice] = 'Game was successfully deleted.'
  end

  def guessingreportgame
    @thisgame = Game.find(params[:game_id])
    if current_user.id == @thisgame.guesser_id1
      @thisgame.update(:gsr1_cheat => 1)
    elsif current_user.id == @thisgame.guesser_id2
      @thisgame.update(:gsr2_cheat => 1)
    elsif current_user.id == @thisgame.guesser_id3
      @thisgame.update(:gsr3_cheat => 1)
    elsif current_user.id == @thisgame.guesser_id4
      @thisgame.update(:gsr4_cheat => 1)
    elsif current_user.id == @thisgame.guesser_id5
      @thisgame.update(:gsr5_cheat => 1)
    elsif current_user.id == @thisgame.guesser_id6
      @thisgame.update(:gsr6_cheat => 1)
    end

    @cheatnum = @thisgame.gsr1_cheat + @thisgame.gsr2_cheat + @thisgame.gsr3_cheat + @thisgame.gsr4_cheat + @thisgame.gsr5_cheat + 
                @thisgame.gsr6_cheat

    current_user.increment!(:lifetimecheatreports, by = 1)

    if @cheatnum > 2
      respond_to do |format|
        format.json { render json: {} , status: 666 }
      end
      User.find(@thisgame.giver_id).increment!(:lifetimecheatgames, by = 1)
      @thisgame.delete
      flash[:notice] = 'Third cheat report received. Game deleted.'
    else
      respond_to do |format|
        format.json { render json: {} , status: 200 }
      end
      flash[:notice] = 'Cheat report received.'
    end
  end

  def soundonoff
    current_user.update(:sound => params[:sound])
    render body: nil
  end

  def entermessage
    @gamechat = Chat.create!(:message => params[:message], :user_id => current_user.id, :game_id => params[:game_id])

    Chat.where(:game_id => params[:game_id]).where('id NOT IN (?)', Chat.where(:game_id => params[:game_id]).last(25)).destroy_all
    @thegame = Game.find(params[:game_id])

    if current_user.id == @thegame.giver_id
      @thegame.increment!(:gsr1_chats, by = 1).increment!(:gsr2_chats, by = 1)
        .increment!(:gsr3_chats, by = 1).increment!(:gsr4_chats, by = 1).increment!(:gsr5_chats, by = 1)
        .increment!(:gsr6_chats, by = 1)
    elsif current_user.id == @thegame.guesser_id1
      @thegame.increment!(:giver_chats, by = 1).increment!(:gsr2_chats, by = 1)
        .increment!(:gsr3_chats, by = 1).increment!(:gsr4_chats, by = 1).increment!(:gsr5_chats, by = 1)
        .increment!(:gsr6_chats, by = 1)
    elsif current_user.id == @thegame.guesser_id2
      @thegame.increment!(:giver_chats, by = 1).increment!(:gsr1_chats, by = 1)
        .increment!(:gsr3_chats, by = 1).increment!(:gsr4_chats, by = 1).increment!(:gsr5_chats, by = 1)
        .increment!(:gsr6_chats, by = 1)
    elsif current_user.id == @thegame.guesser_id3
      @thegame.increment!(:giver_chats, by = 1).increment!(:gsr1_chats, by = 1).increment!(:gsr2_chats, by = 1)
        .increment!(:gsr4_chats, by = 1).increment!(:gsr5_chats, by = 1).increment!(:gsr6_chats, by = 1)
    elsif current_user.id == @thegame.guesser_id4
      @thegame.increment!(:giver_chats, by = 1).increment!(:gsr1_chats, by = 1).increment!(:gsr2_chats, by = 1)
        .increment!(:gsr3_chats, by = 1).increment!(:gsr5_chats, by = 1).increment!(:gsr6_chats, by = 1)
    elsif current_user.id == @thegame.guesser_id5
      @thegame.increment!(:giver_chats, by = 1).increment!(:gsr1_chats, by = 1).increment!(:gsr2_chats, by = 1)
        .increment!(:gsr3_chats, by = 1).increment!(:gsr4_chats, by = 1).increment!(:gsr6_chats, by = 1)
    elsif current_user.id == @thegame.guesser_id6
      @thegame.increment!(:giver_chats, by = 1).increment!(:gsr1_chats, by = 1).increment!(:gsr2_chats, by = 1)
        .increment!(:gsr3_chats, by = 1).increment!(:gsr4_chats, by = 1).increment!(:gsr5_chats, by = 1)
    end

    # notify players of chat
    @thisgame = Game.find(params[:game_id])

    if News.where(:targetuser_id => @thisgame.giver_id).where(:targetgame_id => @thisgame.id)
      .where(:newstype => 4).where(:seen => 0).count == 0 && @thisgame.giver_id != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.giver_id, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.giver_id).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    if @thisgame.guesser_id1 != 0 && News.where(:targetuser_id => @thisgame.guesser_id1)
      .where(:targetgame_id => @thisgame.id).where(:newstype => 4).where(:seen => 0).count == 0 && 
      @thisgame.guesser_id1 != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.guesser_id1, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.guesser_id1).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    if @thisgame.guesser_id2 != 0 && News.where(:targetuser_id => @thisgame.guesser_id2)
      .where(:targetgame_id => @thisgame.id).where(:newstype => 4).where(:seen => 0).count == 0 && 
      @thisgame.guesser_id2 != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.guesser_id2, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.guesser_id2).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    if @thisgame.guesser_id3 != 0 && News.where(:targetuser_id => @thisgame.guesser_id3)
      .where(:targetgame_id => @thisgame.id).where(:newstype => 4).where(:seen => 0).count == 0 && 
      @thisgame.guesser_id3 != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.guesser_id3, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.guesser_id3).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    if @thisgame.guesser_id4 != 0 && News.where(:targetuser_id => @thisgame.guesser_id4)
      .where(:targetgame_id => @thisgame.id).where(:newstype => 4).where(:seen => 0).count == 0 && 
      @thisgame.guesser_id4 != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.guesser_id4, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.guesser_id4).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    if @thisgame.guesser_id5 != 0 && News.where(:targetuser_id => @thisgame.guesser_id5)
      .where(:targetgame_id => @thisgame.id).where(:newstype => 4).where(:seen => 0).count == 0 && 
      @thisgame.guesser_id5 != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.guesser_id5, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.guesser_id5).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    if @thisgame.guesser_id6 != 0 && News.where(:targetuser_id => @thisgame.guesser_id6)
      .where(:targetgame_id => @thisgame.id).where(:newstype => 4).where(:seen => 0).count == 0 && 
      @thisgame.guesser_id6 != current_user.id
      News.create!(:newstype => 4, :targetuser_id => @thisgame.guesser_id6, :giveruser_id => current_user.id,
        :targetgame_id => @thisgame.id)
      usernews = News.where(:targetuser_id => @thisgame.guesser_id6).all
      usernews.order('created_at DESC').offset(20).destroy_all
    end
    
    render body: nil
  end

  def resetchatnotify
    @toreset = Game.find(params[:game_id])
    if current_user.id == @toreset.giver_id
      @toreset.update(:giver_chats => 0)
    elsif current_user.id == @toreset.guesser_id1
      @toreset.update(:gsr1_chats => 0)
    elsif current_user.id == @toreset.guesser_id2
      @toreset.update(:gsr2_chats => 0)
    elsif current_user.id == @toreset.guesser_id3
      @toreset.update(:gsr3_chats => 0)
    elsif current_user.id == @toreset.guesser_id4
      @toreset.update(:gsr4_chats => 0)
    elsif current_user.id == @toreset.guesser_id5
      @toreset.update(:gsr5_chats => 0)
    elsif current_user.id == @toreset.guesser_id6
      @toreset.update(:gsr6_chats => 0)
    end

    render body: nil
  end


  def delgame
    @todelete = Game.find(params[:game_id])
    @todelete.delete

    render body: nil
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_params
      params.require(:game).permit(:letters)
    end
end
