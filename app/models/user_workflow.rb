class UserWorkflow < ActiveRecord::Base
  validates :workflow_id, :user_id, presence: true

  has_many :workflow_responses, -> (object){ where("version = ?", object.version)}, through: :workflow
  belongs_to :workflow
  belongs_to :user
  belongs_to :workflow_response
  belongs_to :message

  before_create :set_start_date

  def generate_response(message)
    workflow_response = process_message(message)

    if workflow_response.nil?
      # Trigger nested help cycle
    else
      # Updates current state references of user workflow
      self.update_references!(workflow_response, message)

      # Assigns UserWorkflow and Response to Incoming Message
      message.update_references!(workflow_response, self)

      completed if workflow_response.terminates?

      return workflow_response
    end
  end

  def next_workflow_response(trigger_id)
    workflow_responses.where(parent_id: id, trigger_id: trigger_id)
  end

  def completed
    self.ended_at = DateTime.current
    self.save!
  end

  def update_references!(workflow_response, message)
    self.update_attributes!(
      workflow_response_id: workflow_response.id,
      message_id: message.id
    )
  end

  private

  def process_message(message)
    message_tokens = message.tokenize
    possible_responses = workflow_responses.where(parent_id: workflow_response_id).includes(:trigger_strings)

    possible_responses.each do |workflow_response|
      workflow_response.trigger_strings.each do |trigger_string|
        test_string = trigger_string.text

        if test_string[0] == "/"
          # convert to regex comparison
        else
          trigger_array = test_string.split(' ')

          matched = true
          trigger_array.each_with_index do |str, idx|
            if str != message_tokens[idx]
              matched = false
              break
            end
          end

          if matched
            # Call workflow_action if flagged and return that response instead
            return workflow_response
          end
        end
      end
    end
  end

  def set_start_date
    self.started_at = DateTime.current
  end
end
