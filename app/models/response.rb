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

  def to_node(workflow_response_id, x = nil, y = nil, is_root = false)
    json = {}
    json[:id] = "#{workflow_response_id}r#{id}"
    json[:label] = "\"#{body}\""
    json[:group] = 'Response'
    json[:actionable_id] = id
    json[:size] = 3
    json[:x] = x
    json[:y] = y
    json[:workflow_response_id] = workflow_response_id

    if is_root
      json[:is_root] = true
    end

    return json
  end

  def label
    body
  end

  def label=(val)
    self.body = val
  end
end
