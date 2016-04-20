class Action < ActiveRecord::Base
  validates :method, presence: true
  has_many :workflow_responses, through: :actionable
  ACTION_SUCCESS_TRIGGER = 9
  ACTION_FAIL_TRIGGER = 10

  def execute_method(user, captures = nil)
    self.send(method, *[user, captures])
  end

  def save_user_name(user, captures = [])
    return if captures.empty? || user.nil?
    result = {}
    name_first, name_last = captures[0], captures[1]

    response = user.update_attributes!(
      name_first: name_first,
      name_last: name_last
    )

    result[:trigger_id] = response ? ACTION_SUCCESS_TRIGGER : ACTION_FAIL_TRIGGER
    result
  end

  def name_first(user, captures = [])
    user.reload
    result = {text: []}
    name = user.name_first.capitalize

    if name.nil?
      result[:trigger_id] = ACTION_SUCCESS_TRIGGER
    else
      result[:text] << name
      result[:trigger_id] = ACTION_FAIL_TRIGGER
    end
    result
  end

  def to_node
    json = {}
    json['id'] = id
    json['method'] = method

    return json
  end
end
