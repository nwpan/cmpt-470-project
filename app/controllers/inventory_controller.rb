class InventoryController < ApplicationController
	before_filter :sign_in_required

  	def destroy
  		@inventory_entry = current_user.inventory.where(:item_id => params[:id]).last.destroy

	    redirect_to user_path(current_user)
  	end
end
