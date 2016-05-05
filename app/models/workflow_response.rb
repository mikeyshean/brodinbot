class WorkflowResponse < ActiveRecord::Base
  has_many :incoming_edges, class_name: "Edge", foreign_key: :target_id
  has_many :outgoing_edges, class_name: "Edge", foreign_key: :source_id
  has_many :children, through: :outgoing_edges, source: :target
  has_many :parents, through: :incoming_edges, source: :source
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
    json[:id] = id
    json[:workflow_id] = workflow_id
    json[:version] = version
    json[:trigger] = trigger ? trigger.to_node : nil
    json[:actionable_type] = actionable_type
    json[:actionable] = actionable ? actionable.to_node : nil
    json[:children] = []

    return json
  end

  def trigger_with_edges(*args)
    json = {}
    trigger_node = trigger.to_node(*args)
    json[:nodes] = [trigger_node]
    json[:edges] = [];

    json[:edges] << {
      id: self.edge_id,
      source: trigger_node[:id],
      target: actionable.to_node(id)[:id]
    }

    parents.each do |parent|
      json[:edges] << {
        id: parent.edge_id(self),
        source: parent.actionable.to_node(parent.id)[:id],
        target: trigger_node[:id]
      }
    end

    return json
  end

  def actionable_with_edges(*args)
    json = {}
    actionable_node = actionable.to_node(*args)
    json[:nodes] = [actionable_node]
    json[:edges] = [];

    json[:edges] << {
      id: self.edge_id,
      source: trigger.to_node(id)[:id],
      target: actionable_node[:id]
    }

    children.each do |child|
      json[:edges] << {
        id: self.edge_id(child),
        source: actionable_node[:id],
        target: child.trigger.to_node(child.id)[:id]
      }
    end

    return json
  end

  def edge_id(child = false)
    if child
      return "#{id}.#{actionable_id}.#{child.trigger_id}"
    else
      return "#{id}.#{trigger_id}.#{actionable_id}"
    end
  end
end
