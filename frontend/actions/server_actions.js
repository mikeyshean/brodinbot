var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');

ServerActions = {

  receiveAllUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: AppConstants.USERS_RECEIVED,
      users: users
    });
  },

  deleteUser: function (userId) {
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_DELETED,
      userId: userId
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

  deleteWorkflow: function (workflowId) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOW_DELETED,
      workflowId: workflowId
    })
  },

  receiveTree: function (tree) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TREE_RECEIVED,
      tree: tree
    });
  },

  receiveAllTriggers: function (triggers) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TRIGGERS_RECEIVED,
      triggers: triggers
    });
  },

  deleteTrigger: function (triggerId) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TRIGGER_DELETED,
      triggerId: triggerId
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
}

module.exports = ServerActions;
