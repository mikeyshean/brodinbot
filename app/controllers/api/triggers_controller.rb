class Api::TriggersController < ApplicationController

  def index
    @triggers = Trigger.all
    render 'index'
  end
end
