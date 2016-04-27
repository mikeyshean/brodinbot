class Api::WorkflowsController < ApplicationController

  def index
    @workflows = Workflow.all
    render 'index'
  end

  def show
    @tree = Workflow.build_tree(params[:id], params[:version])

    render json: @tree
  end

  def create
    @workflow = Workflow.new(workflow_params)

    if @workflow.save
      render json: @workflow
    else
      render :json => { :errors => @workflow.errors.full_messages }, status: 422
    end
  end

  def destroy
    @workflow = Workflow.find(params[:id])
    @workflow.destroy

    render json: {}, status: 200
  end

  private

  def workflow_params
    params.require(:workflow).permit(:name, :category, :is_active, :current_version)
  end

end
