class Workflow < ActiveRecord::Base
  validates :name, :is_active, presence: true
  has_many :workflow_responses
  has_many :responses, through: :workflow_responses, source: :response
  belongs_to :parent, class_name: "Workflow", foreign_key: :parent_id

  WORKFLOWS = {
    :NEW_USER => 1
  }

  def self.start_user_workflow(message)
    if message.user.is_new?
      workflow = Workflow.find(WORKFLOWS[:NEW_USER])
      workflow_response = workflow.first_workflow_response

      user_workflow = UserWorkflow.create!(
        workflow_id: workflow.id,
        version: workflow.current_version,
        user_id: message.user_id,
        workflow_response_id: workflow_response.id,
        message_id: message.id
      )

      message.save!(
        workflow_response_id: workflow_response.id,
        user_workflow_id: user_workflow.id
      )
    else
      Workflow.parse(message)
    end

    return workflow_response
  end

  def first_workflow_response(version = current_version)
    WorkflowResponse.find_by(workflow_id: id, version: version, parent_id: nil)
  end

end
