class Api::WorkflowResponsesController < ApplicationController

  def create
    workflow_response = WorkflowResponse.new(workflow_response_params)

    if workflow_response.save
      parent = workflow_response.parent
      if parent && parent.terminates?
        parent.unterminate
        workflow_response.terminate
      end

      render json: workflow_response.to_node
    else
      render :json => { :errors => workflow_response.errors.full_messages }, status: 422
    end
  end

  private

  def workflow_response_params
    params.require(:workflow_response).permit(:workflow_id, :version, :parent_id)
  end
end
