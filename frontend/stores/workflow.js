var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _workflows = [];
var WorkflowStore = new Store(AppDispatcher);

WorkflowStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case AppConstants.WORKFLOWS_RECEIVED:
      _workflows = payload.workflows;
      WorkflowStore.__emitChange();
      break;

    case AppConstants.WORKFLOW_RECEIVED:
      _workflows.push(payload.workflow);
      WorkflowStore.__emitChange();
      break;

    case AppConstants.WORKFLOW_DELETED:
      var index;
      for (var i = 0; i < _workflows.length; i++) {
        if (_workflows[i].id === payload.workflowId) {
          index = i;
          break;
        }
      }
      _workflows.splice(index, 1);
      WorkflowStore.__emitChange();
      break;
  }
}

WorkflowStore.all = function () {
  return Object.assign({}, _workflows);
};

module.exports = WorkflowStore
