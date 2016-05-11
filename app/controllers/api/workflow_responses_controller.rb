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
      render :json => {:errors => workflow_response.errors.full_messages}, status: 422
    end
  end

  def update
    workflow_response = WorkflowResponse.includes(:actionable, :trigger).where(id: params[:id]).first

    if workflow_response.update(workflow_response_params)

      if workflow_response_params[:trigger_id]
        render json: workflow_response.trigger_with_edges, status: 200
      elsif workflow_response_params[:actionable_id]
        render json: workflow_response.actionable_with_edges, status: 200
      else
        # Updating new node coords only
        render json: {}, status: 200
      end

    else
      render :json => {:errors => workflow_response.errors.full_messages}, status: 422
    end
  end

  def destroy
    workflow_response = WorkflowResponse.find(params[:id]);

    if workflow_response.terminates?
      parent = workflow_response.parent
      if parent && parent.children.length == 1
        parent.terminate
      end
    end

    destroy_children(workflow_response.children)
    workflow_response.destroy

    render json: {}, status: 200
  end

  private

  def workflow_response_params
    params.require(:workflow_response).permit(:id, :workflow_id, :version, :actionable_x, :actionable_y, :trigger_x, :trigger_y, :trigger_id, :actionable_id, :actionable_type)
  end

  def destroy_children(children)
    children.each do |child|
      destroy_children(child.children)
      child.delete
    end
  end
end
