class Message < ActiveRecord::Base
  validates :body, presence: true
  belongs_to :user
  belongs_to :workflow_response_id

  def self.create_incoming_message(params, user, response = nil)
    response_id = response ? response.id : nil

    message = Message.create!(
      body: params['Body'],
      user_id: user.id,
      response_id: response_id
    )

    return message
  end

  def save_response(response)
    self.response_id = response.id
    self.save
  end
end
