class Api::ActionsController < ApplicationController

  def index
    @actions = Action.all
    render 'index'
  end
end
