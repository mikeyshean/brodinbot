class Api::WorkflowsController < ApplicationController

  def index
    @workflows = Workflow.all
    render 'index'
  end
end
