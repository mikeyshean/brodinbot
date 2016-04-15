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
    WorkflowResponse.where(
      workflow_id: workflow_id,
      version: version
    )
  end
end
