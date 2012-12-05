class UsersController < ApplicationController
  before_filter :sign_in_required, :only => [:show]

  def show
    @user = User.find(params[:id])
    @user_items = @user.items.order("name ASC").page(params[:page])
    @user_colours = @user_items.where("item_type = ?", "Colour").order("name ASC")
  end

  def avatar
    @user = User.find(params[:id])
    @user_items = @user.items.where("item_type != ?", "Colour").order("name ASC").page(params[:page])
    @user_colours = @user.items.where("item_type = ?", "Colour").order("name ASC")
    #Check if the colour is in the user's inventory.
    if @user.colour1? && @user_items.exists?(@user.colour1)
	@user_colour1 = Item.find(@user.colour1)
    else
	@user_colour1 = nil
    end
    if @user.colour2? && @user_items.exists?(@user.colour2)
    	@user_colour2 = Item.find(@user.colour2)
    else
	@user_colour2 = nil
    end
    if @user.colour3? && @user_items.exists?(@user.colour3)
    	@user_colour3 = Item.find(@user.colour3)
    else
	@user_colour3 = nil
    end
  end

  def wear
    @user = User.find(current_user.id)
    @item = Item.find(params[:id])
    if @item.item_type == "Hat"
    	@user.hat = @item.id
    	@user.save!
    end
    redirect_to avatar_user_path(current_user.id)
  end

  def remove
    @user = User.find(current_user.id)
    @item = Item.find(params[:id])
    if @item.item_type == "Hat"
    	@user.hat = nil
    	@user.save!
    end
    redirect_to avatar_user_path(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    value1 = params[:colour1]
    value2 = params[:colour2]
    value3 = params[:colour3]    

    @user.colour1 = value1
    @user.colour2 = value2
    @user.colour3 = value3
    @user.save!
    redirect_to avatar_user_path(current_user.id)
  end

  def new
    @user = User.new

    render :layout => "application_login"
  end

  def create
    @user = User.new(params[:user])
    if @user.save
        sign_in @user
        redirect_to :root, :notice => "Hello! We've noticed this is your first time logging into MeGL. Please use the navigation menu on the top to get around."
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
    redirect_to :root, :notice => "Starcraft cheat enabled. We've deposited 1000 credits to the account, #{@user.first_name}!"
  end
end
