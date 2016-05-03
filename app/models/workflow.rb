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
    WorkflowResponse.find_by(workflow_id: id, version: version, is_root: true)
  end

  def self.build_graph(id, version)
    workflow_responses = WorkflowResponse.includes(:trigger, :actionable, children: :actionable)
      .where(workflow_id: id, version: version).order(:trigger_id).to_a

    workflow_responses.unshift(workflow_responses.pop)

    node_map = {
      nodes: [],
      edges: []
    }

    edge_count = 0

    workflow_responses.each do |workflow_response|
      trigger = workflow_response.trigger
      actionable = workflow_response.actionable


      node_map[:nodes] << actionable.to_node(
        workflow_response.actionable_x,
        workflow_response.actionable_y,
        workflow_response.id
      )


      if trigger
        node_map[:nodes] << trigger.to_node(
          workflow_response.trigger_x,
          workflow_response.trigger_y,
          workflow_response.id
        )
        node_map[:edges] << {
          id: "e#{edge_count}",
          source: "#{trigger.node_id}",
          target: "#{actionable.node_id}"
        }
        edge_count += 1
      end

      workflow_response.children.each do |child|
        node_map[:edges] << {
          id: "e#{edge_count}",
          source: "#{actionable.node_id}",
          target: "#{child.trigger.node_id}"
        }
        edge_count += 1
      end

    end
    node_map
  end

end
