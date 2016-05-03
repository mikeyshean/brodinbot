var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _application = {navSelection: AppConstants.WORKFLOWS};
var ApplicationStore = new Store(AppDispatcher);

ApplicationStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AppConstants.NAV_SELECTED:
      ApplicationStore.reset();
      _application.navSelection = payload.navSelection;
      ApplicationStore.__emitChange();
      break;

    case AppConstants.GRAPH_RECEIVED:
      _application.graph = payload.graph;
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
