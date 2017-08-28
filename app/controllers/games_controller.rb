class GamesController < ApplicationController
	before_action :set_game, only: [:show]
	# GET /games/new
  def new
    @game = Game.new

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
    # if current_user
    #   @playergames = Gamedata.where(:user_id => current_user.id).order('game_id DESC').all
    #   @playergameslist = @playergames.page(params[:page]).per(8)

    # end
  end

  def startguesser
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

    if params[:guessstatus] == "over,over"
      current_user.increment!(:lifetimegamesguesser, by = 1)
    end

    if params[:guessstatus] == "over,over" && current_user.id == @thisgame.guesser_id6
      @thisgame.update(:gamestatus => "done")
    end
    
    render body: nil
  end

  def addheart
    @thisgame = Game.find(params[:game_id])
    @gamegiver = User.find(@thisgame.giver_id)
    @gamegiver.increment!(:lifetimehearts, by = 1).increment!(:heartnotify, by = 1)

    if current_user.id == @thisgame.guesser_id1
      @thisgame.update(:gsr1_heart => params[:heartgiven])
    elsif current_user.id == @thisgame.guesser_id2
      @thisgame.update(:gsr2_heart => params[:heartgiven])
    elsif current_user.id == @thisgame.guesser_id3
      @thisgame.update(:gsr3_heart => params[:heartgiven])
    elsif current_user.id == @thisgame.guesser_id4
      @thisgame.update(:gsr4_heart => params[:heartgiven])
    elsif current_user.id == @thisgame.guesser_id5
      @thisgame.update(:gsr5_heart => params[:heartgiven])
    elsif current_user.id == @thisgame.guesser_id6
      @thisgame.update(:gsr6_heart => params[:heartgiven])
    end

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
  	@allwords = File.new("config/wordlist").readlines.sample(15)
  	@allwords.each do |w|
    	w.gsub!("\n", "").upcase!
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

  # GET /games/1
  # GET /games/1.json
  def show
  	@allthewords = @game.allwords
  	@badword = @game.loseword
  	@targetwords = @game.correctwords
  	gon.badword = @badword
  	gon.targetwords = @targetwords
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

  	if current_user.id == @game.guesser_id1
  		gon.guessedwords = @game.gsr1_words
      gon.wordsh1 = @game.gsr1_h1words
      gon.wordsh2 = @game.gsr1_h2words
      gon.wordsh3 = @game.gsr1_h3words
  		gon.guessstatus = @game.gsr1_status
      gon.spoiler = @game.gsr1_spoiler
      gon.guessernum = "1"
      gon.playerscore = @game.gsr1_score
      gon.heartstatus = @game.gsr1_heart
      if @game.gsr1_status == "over,over" && @game.gamestatus != "give"
        @chatshow = true
      end
  	elsif current_user.id == @game.guesser_id2
  		gon.guessedwords = @game.gsr2_words
      gon.wordsh1 = @game.gsr2_h1words
      gon.wordsh2 = @game.gsr2_h2words
      gon.wordsh3 = @game.gsr2_h3words
  		gon.guessstatus = @game.gsr2_status
      gon.spoiler = @game.gsr2_spoiler
      gon.guessernum = "2"
      gon.playerscore = @game.gsr2_score
      gon.heartstatus = @game.gsr2_heart
      if @game.gsr2_status == "over,over" && @game.gamestatus != "give"
        @chatshow = true
      end
  	elsif current_user.id == @game.guesser_id3
  		gon.guessedwords = @game.gsr3_words
      gon.wordsh1 = @game.gsr3_h1words
      gon.wordsh2 = @game.gsr3_h2words
      gon.wordsh3 = @game.gsr3_h3words
  		gon.guessstatus = @game.gsr3_status
      gon.spoiler = @game.gsr3_spoiler
      gon.guessernum = "3"
      gon.playerscore = @game.gsr3_score
      gon.heartstatus = @game.gsr3_heart
      if @game.gsr3_status == "over,over" && @game.gamestatus != "give"
        @chatshow = true
      end
    elsif current_user.id == @game.guesser_id4
      gon.guessedwords = @game.gsr4_words
      gon.wordsh1 = @game.gsr4_h1words
      gon.wordsh2 = @game.gsr4_h2words
      gon.wordsh3 = @game.gsr4_h3words
      gon.guessstatus = @game.gsr4_status
      gon.spoiler = @game.gsr4_spoiler
      gon.guessernum = "4"
      gon.playerscore = @game.gsr4_score
      gon.heartstatus = @game.gsr4_heart
      if @game.gsr4_status == "over,over" && @game.gamestatus != "give"
        @chatshow = true
      end
    elsif current_user.id == @game.guesser_id5
      gon.guessedwords = @game.gsr5_words
      gon.wordsh1 = @game.gsr5_h1words
      gon.wordsh2 = @game.gsr5_h2words
      gon.wordsh3 = @game.gsr5_h3words
      gon.guessstatus = @game.gsr5_status
      gon.spoiler = @game.gsr5_spoiler
      gon.guessernum = "5"
      gon.playerscore = @game.gsr5_score
      gon.heartstatus = @game.gsr5_heart
      if @game.gsr5_status == "over,over" && @game.gamestatus != "give"
        @chatshow = true
      end
    elsif current_user.id == @game.guesser_id6
      gon.guessedwords = @game.gsr6_words
      gon.wordsh1 = @game.gsr6_h1words
      gon.wordsh2 = @game.gsr6_h2words
      gon.wordsh3 = @game.gsr6_h3words
      gon.guessstatus = @game.gsr6_status
      gon.spoiler = @game.gsr6_spoiler
      gon.guessernum = "6"
      gon.playerscore = @game.gsr6_score
      gon.heartstatus = @game.gsr6_heart
      if @game.gsr6_status == "over,over" && @game.gamestatus != "give"
        @chatshow = true
      end
  	end

    if current_user.id == @game.giver_id && @game.gamestatus != "give"
      @chatshow = true
    end
  end

  def submithints
  	@thisgame = Game.find(params[:game_id])
		@thisgame.update(:giver_id => current_user.id, :hintword1 => params[:word1], :gamestatus => "guess",
			:hintword2 => params[:word2], :hintnum1 => params[:word1num], :hintnum2 => params[:word2num], 
      :hintword3 => params[:word3], :hintnum3 => params[:word3num])
    current_user.increment!(:lifetimegamesgiver, by = 1)

		render body: nil
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
