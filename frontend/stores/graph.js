var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _graphState = {};

var GraphStore = new Store(AppDispatcher);

var resetUpdates = function () {
  _graphState.update = false;
  _graphState.nodeMap = null;
};


GraphStore.__onDispatch = function (payload) {

  switch (payload.actionType) {
    case AppConstants.WORKFLOW_RESPONSE_TRIGGER_RECEIVED:
      _graphState.update = true;
      _graphState.nodeMap = payload.nodeMap;
      GraphStore.__emitChange();
      break;

    case AppConstants.WORKFLOW_RESPONSE_ACTIONABLE_RECEIVED:
      _graphState.update = true;
      _graphState.nodeMap = payload.nodeMap;
      GraphStore.__emitChange();
      break;
  }
};

GraphStore.all = function () {
  var result = Object.assign({}, _graphState);
  resetUpdates();
  return result;
};

module.exports = GraphStore;
