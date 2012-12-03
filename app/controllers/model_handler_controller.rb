class ModelHandlerController < ApplicationController
  include ActionView::Helpers::AssetTagHelper

  # usage: http://localhost:3000/model_handler/show.json?model=[json model name]
  def show
    json_var = params['model']
    
    path = Rails.root.join("app/assets/json/#{json_var}.json")

    respond_to do |format|
        format.html {
          @model = json_var
          @json = File.open(Rails.root.join("app/assets/json/#{json_var}.json").to_s, 'r').read
          render :layout => 'iframe'
        }
        format.json {
            if File.exists?(path)
                render :json => File.open(Rails.root.join("app/assets/json/#{json_var}.json").to_s, 'r')
            else
                redirect_to :root
            end
        }
    end
  end

end
