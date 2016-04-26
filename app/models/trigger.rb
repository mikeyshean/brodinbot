class Trigger < ActiveRecord::Base
  validates :category, presence: true, uniqueness: true
  has_many :trigger_strings
  has_many :workflow_responses

  def to_node
    json = {}
    json['id'] = id
    json['category'] = category
    
    return json
  end
end
