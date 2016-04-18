class WorkflowResponse < ActiveRecord::Base
  belongs_to :parent, class_name: "WorkflowResponse"
  has_many :children, class_name: "WorkflowResponse", foreign_key: :parent_id
  belongs_to :trigger
  belongs_to :workflow
  has_many :trigger_strings, through: :trigger
  belongs_to :actionable, :polymorphic => true

  def response_body
    self.actionable.body
  end

  def terminates?
    self.terminates
  end
end
