class UserWorkflow < ActiveRecord::Base
  validates :workflow_id, :user_id, presence: true

  has_many :workflow_responses, through: :workflow
  belongs_to :workflow
  belongs_to :user

  before_create :set_start_date

  def set_start_date
    self.started_at = DateTime.current
  end

  def next_workflow_response
    workflow_responses.find_by(index: index + 1)
  end

  def first_workflow_response
    workflow_responses.find_by(index: 0)
  end

  def workflow_responses
    WorkflowResponse.where(workflow_id: workflow_id, version: version)
  end

  def generate_response(message)
    trigger_strings = self.trigger_strings
    # Identify acceptable triggers based on last sent response

  end

  def trigger_strings
    WorkflowResponse.find_by(
      workflow_id: workflow_id,
      version: version,
      index: index
    ).trigger_strings
  end
end
