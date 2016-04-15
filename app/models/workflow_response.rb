class WorkflowResponse < ActiveRecord::Base
  belongs_to :response
  belongs_to :parent, class_name: "WorkflowResponse", foreign_key: :parent_id
  belongs_to :trigger
  belongs_to :workflow

  def response_body
    self.response.body
  end
end
