var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');

ServerActions = {

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

  receiveFormErrors: function (messages) {
    AppDispatcher.dispatch({
      actionType: AppConstants.FORM_ERRORS_RECEIVED,
      messages: messages
    })
  },
}

module.exports = ServerActions;
