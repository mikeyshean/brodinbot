class Trigger < ActiveRecord::Base
  validates :category, presence: true, uniqueness: true
  has_many :trigger_strings
  has_many :workflow_responses

  def to_node(x, y, workflow_response_id)
    json = {}
    json['id'] = node_id
    json['label'] = category
    json['group'] = 'Trigger'
    json['size'] = 3
    json['x'] = x
    json['y'] = y
    json['workflow_response_id'] = workflow_response_id

    return json
  end

  def node_id
    "t#{id}"
  end
end
