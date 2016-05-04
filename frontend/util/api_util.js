var ServerActions = require('../actions/server_actions');
var FormActions = require('../actions/form_actions');

var ApiUtil = {

  fetchUsers: function(){
    $.get('api/users', function(users) {
      ServerActions.receiveAllUsers(users);
    });
  },

  deleteUser: function(user) {
    $.delete('api/users/'+user.id, function() {
      ServerActions.deleteUser(user);
    })
  },

  fetchWorkflows: function(){
    $.get('api/workflows', function(workflows) {
      ServerActions.receiveAllWorkflows(workflows);
    });
  },

  createWorkflow: function(data) {
    $.post('api/workflows', {workflow: data}, function(workflow) {
      ServerActions.receiveWorkflow(workflow);
      FormActions.clearFormErrors();
    }).fail(function (resp) {
      ServerActions.receiveFormErrors(resp.responseJSON.errors);
    });
  },

  deleteWorkflow: function(workflow) {
    $.delete('api/workflows/'+workflow.id, function() {
      ServerActions.deleteWorkflow(workflow);
    })
  },

  fetchGraph: function(id,version){
    var url = 'api/workflows/'+id+"?version="+version;

    $.get(url, function(graph) {
      ServerActions.receiveGraph(graph);
    });
  },

  fetchTriggers: function(){
    $.get('api/triggers', function(triggers) {
      ServerActions.receiveAllTriggers(triggers);
    });
  },

  deleteTrigger: function(trigger) {
    $.delete('api/triggers/'+trigger.id, function() {
      ServerActions.deleteTrigger(trigger);
    })
  },

  createWorkflowResponse: function(parentId, workflowId, version) {
    $.post(
      'api/workflow_responses/',
      {
        workflow_response: {
          parent_id: parentId,
          workflow_id: workflowId,
          version: version
        }
      },
      function(workflowResponse) {
      ServerActions.receiveWorkflowResponse(workflowResponse);
    })
  },

  deleteWorkflowResponse: function(workflowResponse) {
    $.delete('api/workflow_responses/'+workflowResponse.id, function() {
      ServerActions.deleteWorkflowResponse(workflowResponse);
    })
  },

  saveNodePosition: function(node) {
    var url;
    var data = {
      workflow_response: {
        id: node.workflow_response_id
      }
    };

    switch(node.group) {
      case "Trigger":
        data.workflow_response.trigger_x = node.x;
        data.workflow_response.trigger_y = node.y;
        break;

      default:
        data.workflow_response.actionable_x = node.x;
        data.workflow_response.actionable_y = node.y;
    }

    $.put('api/workflow_responses/'+node.workflow_response_id, data, function(resp) {
    })
  },
}

module.exports = ApiUtil;
