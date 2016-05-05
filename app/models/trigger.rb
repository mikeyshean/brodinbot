class Trigger < ActiveRecord::Base
  validates :category, presence: true, uniqueness: true
  has_many :trigger_strings
  has_many :workflow_responses

  def to_node(workflow_response_id, x = nil, y = nil)
    json = {}
    json[:id] = "#{workflow_response_id}t#{id}"
    json[:label] = category
    json[:group] = 'Trigger'
    json[:trigger_id] = id
    json[:size] = 3
    json[:x] = x
    json[:y] = y
    json[:workflow_response_id] = workflow_response_id

    return json
  end

  def label
    category
  end

  def label=(val)
    self.category = val
  end
end
