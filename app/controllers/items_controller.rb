class ItemsController < ApplicationController
  before_filter :sign_in_required
  # GET /items
  # GET /items.json
  def index
    @items = Item.order("price ASC").page(params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
    end
  end

  def purchase
    @user = User.find(current_user.id)
    if !@user.purchase_item(params[:id])
      flash[:error] = "ERROR: Item not purchased, please check your balance on the profile page."
      redirect_to items_path
      return
    end
    @user.save!
    redirect_to user_path(current_user.id)
  end

  # GET /items/item_type
  def showHats
    @items = Item.where("item_type = ?", "Hat").order("price ASC").page(params[:page])
  end

  def showTops
    @items = Item.where("item_type = ?", "Top").order("price ASC").page(params[:page])
  end

  def showBottoms
    @items = Item.where("item_type = ?", "Bottom").order("price ASC").page(params[:page])
  end

  def showShoes
    @items = Item.where("item_type = ?", "Shoes").order("price ASC").page(params[:page])
  end

  def showColours
    @items = Item.where("item_type = ?", "Colour").order("name ASC").page(params[:page])
  end

  # GET /items/1
  # GET /items/1.json
  def show
    @item = Item.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end
end
