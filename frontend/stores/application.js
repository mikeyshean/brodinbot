var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var ApiUtil = require('../util/api_util');
var _application = {navSelection: AppConstants.WORKFLOWS};
var ApplicationStore = new Store(AppDispatcher);

var resetEditor = function () {
  _application.trigger = null;
  _application.actionable = null;
}
ApplicationStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AppConstants.NAV_SELECTED:
      ApplicationStore.reset();
      _application.navSelection = payload.navSelection;
      resetEditor();
      ApplicationStore.__emitChange();
      break;

    case AppConstants.GRAPH_RECEIVED:
      _application.graph = payload.graph;
      resetEditor();
      ApplicationStore.__emitChange();
      break;

    case AppConstants.NODE_SELECTED:
      _application.trigger = payload.trigger;
      _application.actionable = payload.actionable;
      ApplicationStore.__emitChange();
      break;

    case AppConstants.TRIGGERS_RECEIVED:
      _application.triggers = payload.triggers;
      ApplicationStore.__emitChange();
      break;

    case AppConstants.EDITOR_CLOSED:
      resetEditor();
      ApplicationStore.__emitChange();
      break;

    case AppConstants.WORKFLOW_RESPONSE_TRIGGER_RECEIVED:
      _application.trigger = payload.nodeMap.nodes[0];
      ApplicationStore.__emitChange();
      break;
  }
}

ApplicationStore.state = function () {
  return Object.assign({}, _application);
};

ApplicationStore.reset = function () {
  _application = {};
};

module.exports = ApplicationStore
