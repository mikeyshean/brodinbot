class TwilioController < ApplicationController

  enable :sessions

  def receiveSMS
    # Find/Create User by PhoneNumber
    # If new, begin New User Flow
    # Else if open conversation, continue response flow
    # Else, begin returning user flow
    twiml = Twilio::TwiML::Response.new do |r|
      r.Message "Hey Monkey. Thanks for the message!"
    end
    render xml: twiml.text
  end
end
