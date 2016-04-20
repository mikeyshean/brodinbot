class WorkflowResponse < ActiveRecord::Base
  belongs_to :parent, class_name: "WorkflowResponse"
  has_many :children, class_name: "WorkflowResponse", foreign_key: :parent_id
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

  def to_node
    json = {}
    json['id'] = self.id
    json['trigger'] = trigger ? trigger.to_node : nil
    json['actionable_type'] = self.actionable_type
    json['actionable'] = self.actionable.to_node
    json['children'] = []

    return json
  end
end
