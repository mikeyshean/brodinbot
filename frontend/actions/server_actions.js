var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');

ServerActions = {

  receiveAllUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: AppConstants.USERS_RECEIVED,
      users: users
    });
  },

  deleteUser: function (user) {
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_DELETED,
      user: user
    });
  },

  receiveAllWorkflows: function (workflows) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOWS_RECEIVED,
      workflows: workflows
    });
  },

  receiveWorkflow: function (workflow) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOW_RECEIVED,
      workflow: workflow
    });
  },

  deleteWorkflow: function (workflow) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOW_DELETED,
      workflow: workflow
    })
  },

  receiveGraph: function (graph) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GRAPH_RECEIVED,
      graph: graph
    });
  },

  receiveAllTriggers: function (triggers) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TRIGGERS_RECEIVED,
      triggers: triggers
    });
  },

  deleteTrigger: function (trigger) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TRIGGER_DELETED,
      trigger: trigger
    })
  },

  receiveFormErrors: function (messages) {
    AppDispatcher.dispatch({
      actionType: AppConstants.FORM_ERRORS_RECEIVED,
      messages: messages
    })
  },

  receiveWorkflowResponse: function (workflowResponse) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOW_RESPONSE_RECEIVED,
      workflowResponse: workflowResponse
    })
  },

  receiveWorkflowResponseTrigger: function (nodeMap) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOW_RESPONSE_TRIGGER_RECEIVED,
      nodeMap: nodeMap
    })
  },

  deleteWorkflowResponse: function (workflowResponse) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOW_RESPONSE_DELETED,
      workflowResponse: workflowResponse
    })
  },
}

module.exports = ServerActions;
