class WorkflowResponse < ActiveRecord::Base
  belongs_to :response
  has_one :parent, class_name: "WorkflowResponse", foreign_key: :parent_id
  has_one :trigger
  belongs_to :workflow

end
