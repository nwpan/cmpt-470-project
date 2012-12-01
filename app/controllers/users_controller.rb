class UsersController < ApplicationController
  before_filter :sign_in_required, :only => [:show]

  def show
    @user = User.find(params[:id])
    @user_items = @user.items.order("name ASC").page(params[:page])
  end

  def new
    @user = User.new

    render :layout => "application_login"
  end

  def create
    @user = User.new(params[:user])
    if @user.save
        sign_in @user
        redirect_to :root, :notice => "Hello -- we've noticed this is your first time logging into MeGL, please use the navigation menu on the top to get around."
    else
        error = ""
        @user.errors.full_messages.each do |message|
            error << "Error: " << message << "<br />"
        end
        flash.now[:error] = error.html_safe
        render 'new', :layout => 'application_login'
    end
  end

  def showmethemoney
    @user = User.find(params[:id])
    @user.update_column(:balance, @user.balance + 1000)
    redirect_to :root, :notice => "Starcraft cheat enabled. We've deposited 1000 credits to the account, #{@user.id}!"
  end
end
