class Workflow < ActiveRecord::Base
  validates :name, :is_active, presence: true
  has_many :workflow_responses
  has_many :responses, through: :workflow_responses, source: :response

  WORKFLOWS = {
    :NEW_USER => 1
  }

  def self.start_workflow(user, name, version = nil)
    workflow = Workflow.find(WORKFLOWS[name])
    if !version
      version = workflow.current_version
    end

    # Create user_workflow record

    response = workflow.get_response(0, version)
    return response
  end

  def get_response(index, version = self.current_version)
    self.response_by_index_version(index, version)
  end

  def response_by_index_version(index, version = self.current_version)
    WorkflowResponse.includes(:response).where(
      workflow_id: self.id,
      version: version,
      index: index
    )
  end

end
