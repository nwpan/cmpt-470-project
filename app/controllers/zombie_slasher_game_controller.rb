class ZombieSlasherGameController < ApplicationController
  def index
    if !signed_in?
        render :layout => "application_login"
    end
    @users = User.select("id").to_json
  end
end
