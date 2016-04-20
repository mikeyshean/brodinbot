class Response < ActiveRecord::Base
  validates :body, presence: true
  has_many :workflow_responses, through: :actionable
  has_many :workflows, through: :workflow_responses
  belongs_to :action

  def send_response(user)
    account_sid = ENV['TWILIO_SID']
    auth_token = ENV['TWILIO_AUTH']
    client = Twilio::REST::Client.new account_sid, auth_token

    from = ENV['TWILIO_FROM']

    client.account.messages.create(
      :from => from,
      :to => user.phone_number,
      :body => self.body
    )
  end

  def has_action?
    !action_id.nil?
  end

  def to_node
    json = {}
    json['id'] = id
    json['body'] = body

    return json
  end
end
