class UserWorkflow < ActiveRecord::Base
  validates :workflow_id, :user_id, presence: true

  # has_many :workflow_responses, through: :workflow
  belongs_to :workflow
  belongs_to :user
  belongs_to :workflow_response
  belongs_to :message

  before_create :set_start_date

  def generate_response(message)
    trigger_and_ids = self.trigger_strings.pluck(:text, :trigger_id)
    message_tokens = message.tokenize

    trigger_id = get_trigger_id(trigger_and_ids, message_tokens)

    if trigger_id.nil?
      # Trigger nested help cycle
    else
      workflow_response = next_workflow_response(trigger_id)

      self.save!(
        workflow_response_id: workflow_response.id,
        message_id: message.id
      )

      message.save!(
        workflow_response_id: workflow_response.id,
        user_workflow_id: id
      )

      return workflow_response
    end
  end

  def trigger_strings
    TriggerString.joins(trigger: :workflow_responses).where(
      workflow_responses: {
        workflow_id: workflow_id,
        version: version,
        parent_id: workflow_response_id
      }
    )
  end

  def next_workflow_response(trigger_id)
    WorkflowResponse.find_by(
      workflow_id: workflow_id,
      version: version,
      trigger_id: trigger_id,
      parent_id: workflow_response_id
    )
  end

  private

  def get_trigger_id(triggers_and_ids, message_tokens)

    triggers_and_ids.each do |pair|
      trigger_string, trigger_id = pair[0], pair[1]

      if trigger_string[0] == "/"
        # convert to regex comparison
      else
        trigger_array = trigger_string.split(' ')

        matched = true
        trigger_array.each_with_index do |str, idx|
          if str != message_tokens[idx]
            matched = false
            break
          end
        end

        return trigger_id if matched
      end
    end

    return nil
  end

  def set_start_date
    self.started_at = DateTime.current
  end
end
