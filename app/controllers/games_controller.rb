class GamesController < ApplicationController
	before_action :set_game, only: [:show]
	# GET /games/new
  def new
    @game = Game.new

    @gameguesser = Game.where.not(:giver_id => "").first || 1
    # if current_user
    #   @playergames = Gamedata.where(:user_id => current_user.id).order('game_id DESC').all
    #   @playergameslist = @playergames.page(params[:page]).per(8)

    # end
  end

  def startguesser
  	@availgames = Game.where.not(:giver_id => current_user.id, :guesser_id1 => current_user.id, 
  		:guesser_id2 => current_user.id, :guesser_id3 => current_user.id)

  	if @availgames.length > 0

	  	@game = @availgames.order("RANDOM()").first

	  	if @game.guesser_id1 == 0
	  		@game.update(:guesser_id1 => current_user.id)
	  	elsif @game.guesser_id2 == 0
	  		@game.update(:guesser_id2 => current_user.id)
	  	elsif @game.guesser_id3 == 0
	  		@game.update(:guesser_id3 => current_user.id)
	  	end

	    respond_to do |format|
	      format.html { redirect_to @game, notice: '' }
	      #format.json { render :show, status: :created, location: @game }
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

    if current_user.id == @thisgame.guesser_id1
      @thisgame.update(:gsr1_words => params[:guessedwords], :gsr1_status => params[:guessstatus], 
        :gsr1_spoiler => params[:gamespoiled])
    elsif current_user.id == @thisgame.guesser_id2
      @thisgame.update(:gsr2_words => params[:guessedwords], :gsr2_status => params[:guessstatus], 
        :gsr2_spoiler => params[:gamespoiled])
    elsif current_user.id == @thisgame.guesser_id3
      @thisgame.update(:gsr3_words => params[:guessedwords], :gsr3_status => params[:guessstatus], 
        :gsr3_spoiler => params[:gamespoiled])
    end
    
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
			:loseword => @loseword, :giver_id => "")

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
  	gon.hintnum1 = @game.hintnum1
  	gon.hintnum2 = @game.hintnum2
  	if current_user.id == @game.guesser_id1
  		gon.guessedwords = @game.gsr1_words
  		gon.guessstatus = @game.gsr1_status
      gon.spoiler = @game.gsr1_spoiler
  	elsif current_user.id == @game.guesser_id2
  		gon.guessedwords = @game.gsr2_words
  		gon.guessstatus = @game.gsr2_status
      gon.spoiler = @game.gsr2_spoiler
  	elsif current_user.id == @game.guesser_id3
  		gon.guessedwords = @game.gsr3_words
  		gon.guessstatus = @game.gsr3_status
      gon.spoiler = @game.gsr3_spoiler
  	end
  end

  def submithints
  	@thisgame = Game.find(params[:game_id])
		@thisgame.update(:giver_id => current_user.id, :hintword1 => params[:word1], :gamestatus => "guess",
			:hintword2 => params[:word2], :hintnum1 => params[:word1num], :hintnum2 => params[:word2num])

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
