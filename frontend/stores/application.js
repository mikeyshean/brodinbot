var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _application = {};
var ApplicationStore = new Store(AppDispatcher);

ApplicationStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AppConstants.NAV_SELECTED:
      _application['navSelection'] = payload.navSelection;
      ApplicationStore.__emitChange();
      break;

    case AppConstants.WORKFLOW_RECEIVED:
      _application['editorData'] = payload.workflow;
      ApplicationStore.__emitChange();
  }
}

ApplicationStore.state = function () {
  return Object.assign({}, _application);
};

module.exports = ApplicationStore
