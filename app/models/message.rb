class Message < ActiveRecord::Base
  validates :body, presence: true
  belongs_to :user, dependent: :destroy
  belongs_to :workflow_response
  belongs_to :user_workflow

  def self.create_incoming_message(params, user, workflow_response = nil)
    workflow_response_id = workflow_response ? workflow_response.id : nil
    message = Message.create!(
      body: params['Body'],
      user_id: user.id,
      workflow_response_id: workflow_response_id
    )

    return message
  end

  def tokenize
    self.body.downcase.gsub(/[^a-z0-9\s]/i, '').split(' ')
  end

  def save_workflow_response(workflow_response)
    self.workflow_response_id = workflow_response.id
    self.save
  end

  def update_references!(workflow_response, user_workflow)
    self.update_attributes!(
      workflow_response_id: workflow_response.id,
      user_workflow_id: user_workflow.id
    )
  end
end
