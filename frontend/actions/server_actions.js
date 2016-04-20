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
  receiveAllTriggers: function (triggers) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TRIGGERS_RECEIVED,
      triggers: triggers
    });
  },
}

module.exports = ServerActions;
