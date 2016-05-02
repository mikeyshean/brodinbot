class Edge < ActiveRecord::Base
  validates :source, :target, presence: true
  belongs_to :source, class_name: "WorkflowResponse"
  belongs_to :target, class_name: "WorkflowResponse"

end
