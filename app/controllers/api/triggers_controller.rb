class Api::TriggersController < ApplicationController

  def index
    @triggers = Trigger.all
    render 'index'
  end

  def destroy
    @trigger = Trigger.find(params[:id])
    @trigger.destroy
    
    render json: {}, status: 200
  end
end
