class Workflow < ActiveRecord::Base
  validates :name, :is_active, presence: true
  has_many :workflow_responses
  has_many :responses, through: :workflow_responses, source: :response
  belongs_to :parent, class_name: "Workflow", foreign_key: :parent_id

  WORKFLOWS = {
    :NEW_USER => 1
  }

  def self.start_user_workflow(message, name = nil, version = nil)
    if message.user.is_new?
      workflow = Workflow.find(WORKFLOWS[:NEW_USER])
      version = workflow.current_version if !version

      user_workflow = UserWorkflow.create!(
        workflow_id: workflow.id,
        version: version,
        user_id: message.user_id
      )
    else
      user_workflow = Workflow.parse(message)
    end

    return user_workflow
  end

  def get_response(index, version = self.current_version)
    self.response_by_index_version(index, version)
  end

  private

  def response_by_index_version(index, version = self.current_version)
    WorkflowResponse.includes(:response).where(
      workflow_id: self.id,
      version: version,
      index: index
    ).first
    # self.responses.where(:workflow_responses => {:version => version}, index: index)
  end

end
