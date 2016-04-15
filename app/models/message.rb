class Message < ActiveRecord::Base
  validates :body, presence: true
  belongs_to :user
  belongs_to :workflow_response

  def self.create_incoming_message(params, user, workflow_response = nil)
    workflow_response_id = workflow_response ? workflow_response.id : nil
    message = Message.create!(
      body: params['Body'],
      user_id: user.id,
      workflow_response_id: workflow_response_id
    )

    return message
  end

  def save_workflow_response(workflow_response)
    self.workflow_response_id = workflow_response.id
    self.save
  end
end
