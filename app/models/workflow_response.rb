class WorkflowResponse < ActiveRecord::Base
  has_many :incoming_edges, class_name: "Edge", foreign_key: :target_id
  has_many :outgoing_edges, class_name: "Edge", foreign_key: :source_id
  has_many :children, through: :outgoing_edges, source: :target
  belongs_to :trigger
  belongs_to :workflow
  has_many :trigger_strings, through: :trigger
  belongs_to :actionable, :polymorphic => true

  def response_body(user)
    if actionable.has_action?
      result_arr = actionable.action.execute_method(user)
      response_body = sub_text(result_arr)
      return response_body
    else
      return actionable.body
    end
  end

  def sub_text(result_arr)
    text_arr = result_arr[:text]
    response_words = actionable.body.split(' ')
    text_arr.each do |str|
      response_words.each_with_index do |word, idx|
        if word == '*var'
          response_words[idx] = str
          break
        end
      end
    end
    return response_words.join(' ')
  end

  def terminates?
    self.terminates
  end

  def unterminate
    self.terminates = false
    self.save!
  end

  def terminate
    self.terminates = true
    self.save!
  end

  def to_node
    json = {}
    json['id'] = id
    json['workflow_id'] = workflow_id
    json['version'] = version
    json['trigger'] = trigger ? trigger.to_node : nil
    json['actionable_type'] = actionable_type
    json['actionable'] = actionable ? actionable.to_node : nil
    json['children'] = []

    return json
  end
end
