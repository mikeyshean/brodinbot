class TwilioController < ApplicationController

  def receiveSMS
    # Find/Create User by PhoneNumber
    from_number = params['From']

    user = User.find_or_create_by_number(from_number)
    user_message = Message.create_incoming_message(params, user)

    if user.has_active_workflow?
      user_workflow = user.active_workflow
      workflow_response = user_workflow.generate_response(user_message)
      response_body = workflow_response.response_body(user)

      self.send_response(response_body)
    else
      workflow_response = Workflow.start_user_workflow(user_message)
      response_body = workflow_response.response_body(user)

      self.send_response(response_body)
    end
  end

  def send_response(message)
    twiml = Twilio::TwiML::Response.new do |r|
      r.Message message
    end

    render xml: twiml.text
  end
end
