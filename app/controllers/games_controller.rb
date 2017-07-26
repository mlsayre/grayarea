class GamesController < ApplicationController
	before_action :set_game, only: [:show]
	# GET /games/new
  def new
    @game = Game.new
    # if current_user
    #   @playergames = Gamedata.where(:user_id => current_user.id).order('game_id DESC').all
    #   @playergameslist = @playergames.page(params[:page]).per(8)

    # end
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
			:loseword => @loseword, :giver_id => current_user.id, :guesser_id => "")

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
