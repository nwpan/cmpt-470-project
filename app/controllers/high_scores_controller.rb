class HighScoresController < ApplicationController
  before_filter :sign_in_required
  # GET /high_scores
  # GET /high_scores.json
  def index
    @crate_jumper_high_scores = HighScore.select("first_name, game, score").where("game = ?", "Crate Jumper").order("score DESC").limit(10).joins(:user)
    @space_shooter_high_scores = HighScore.select("first_name, game, score").where("game = ?", "Space Shooter").order("score DESC").limit(10).joins(:user)
    @my_high_scores = HighScore.where("user_id = ?", current_user.id).order("score DESC").limit(10)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @high_scores }
    end
  end

  # GET /high_scores/1
  # GET /high_scores/1.json
  def show
    @high_score = HighScore.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @high_score }
    end
  end

  # GET /high_scores/new
  # GET /high_scores/new.json
  def new
    @high_score = HighScore.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @high_score }
    end
  end

  # GET /high_scores/1/edit
  def edit
    @high_score = HighScore.find(params[:id])
  end

  # POST /high_scores
  # POST /high_scores.json
  def create
    @user = User.find(current_user.id)
    score = params[:high_score]
    if @user.new_score(params[:game], score)
      @user.balance += (score.to_i / 100)*250
      @user.save!
    end
  end

  # PUT /high_scores/1
  # PUT /high_scores/1.json
  def update
    @high_score = HighScore.find(params[:id])

    respond_to do |format|
      if @high_score.update_attributes(params[:high_score])
        format.html { redirect_to @high_score, notice: 'High score was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @high_score.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /high_scores/1
  # DELETE /high_scores/1.json
  def destroy
    @high_score = HighScore.find(params[:id])
    @high_score.destroy

    respond_to do |format|
      format.html { redirect_to high_scores_url }
      format.json { head :no_content }
    end
  end
end
