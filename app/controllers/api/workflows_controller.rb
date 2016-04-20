class Api::WorkflowsController < ApplicationController

  def index
    @workflows = Workflow.all
    render 'index'
  end

  def show
    @tree = Workflow.build_tree(params[:id], params[:version])

    render json: @tree
  end

end
