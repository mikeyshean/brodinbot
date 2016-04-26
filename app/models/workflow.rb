class Workflow < ActiveRecord::Base
  validates :name, :is_active, presence: true
  validates :name, uniqueness: true
  has_many :workflow_responses
  has_many :responses, through: :workflow_responses, source: :response
  belongs_to :parent, class_name: "Workflow", foreign_key: :parent_id

  WORKFLOWS = {
    :NEW_USER => 1
  }

  def self.start_user_workflow(message)
    if message.user.is_new?
      workflow = Workflow.find(WORKFLOWS[:NEW_USER])
      workflow_response = workflow.first_workflow_response

      user_workflow = UserWorkflow.create!(
        workflow_id: workflow.id,
        version: workflow.current_version,
        user_id: message.user_id,
        workflow_response_id: workflow_response.id,
        message_id: message.id
      )

      message.update_references!(workflow_response, user_workflow)
    else
      Workflow.parse(message)
    end

    return workflow_response
  end

  def first_workflow_response(version = current_version)
    WorkflowResponse.find_by(workflow_id: id, version: version, parent_id: nil)
  end

  def self.build_tree(id, version)
    workflow_responses = WorkflowResponse.includes(:trigger, :actionable)
      .where(workflow_id: id, version: version).order(:parent_id, :trigger_id).to_a

    queue = []
    node_map = {}
    root = workflow_responses.pop

    unless root.nil?
      root = root.to_node
      queue << root
    end

    until queue.empty?
      node = queue.shift
      workflow_response = workflow_responses.first
      while !workflow_response.nil? && workflow_response.parent_id === node['id']
        workflow_response = workflow_responses.shift
        new_node = workflow_response.to_node
        queue << new_node
        node['children'] << new_node
        workflow_response = workflow_responses.first
      end
    end
    root
  end

end
