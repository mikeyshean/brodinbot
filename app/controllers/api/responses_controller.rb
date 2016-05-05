class Api::ResponsesController < ApplicationController

  def index
    @responses = Response.all
    render 'index'
  end
end
