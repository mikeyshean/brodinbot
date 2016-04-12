class Workflow < ActiveRecord::Base
  validates :name, :is_active, presence: true

  has_many :responses

  WORKFLOWS = {
    :NEW_USER => 1
  }

  def self.create_workflow(name, user)
    workflow = Workflow.find(WORKFLOWS[name])
    # Create user_workflow record

    response = workflow.get_response(0)
    return response
  end

  def get_response(index)
    self.responses.find_by(index: index)
  end
end
