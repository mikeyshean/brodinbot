var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');

ServerActions = {
  receiveAllWorkflows: function (workflows) {
    AppDispatcher.dispatch({
      actionType: AppConstants.WORKFLOWS_RECEIVED,
      workflows: workflows
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
}

module.exports = ServerActions;
