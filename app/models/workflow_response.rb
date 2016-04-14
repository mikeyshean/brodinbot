class WorkflowResponse < ActiveRecord::Base
  belongs_to :response
  belongs_to :parent, class_name: "WorkflowResponse", foreign_key: :parent_id
  has_one :trigger
  belongs_to :workflow

end
