class Response < ActiveRecord::Base
  validates :body, presence: true
  belongs_to :workflow
  has_one :message

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
end
