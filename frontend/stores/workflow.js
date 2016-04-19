var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _workflows = {};
var WorkflowStore = new Store(AppDispatcher);

WorkflowStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AppConstants.WORKFLOWS_RECEIVED:
      _workflows = payload.workflows;
      WorkflowStore.__emitChange();
      break;
  }
}

WorkflowStore.all = function () {
  return Object.assign({}, _workflows);
};

module.exports = WorkflowStore
