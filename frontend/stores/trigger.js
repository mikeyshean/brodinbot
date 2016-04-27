var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _triggers = {};
var TriggerStore = new Store(AppDispatcher);

TriggerStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case AppConstants.TRIGGERS_RECEIVED:
      _triggers = payload.triggers;
      TriggerStore.__emitChange();
      break;

    case AppConstants.TRIGGER_DELETED:
      var index;
      for (var i = 0; i < _triggers.length; i++) {
        if (_triggers[i].id === payload.triggerId) {
          index = i;
          break;
        }
      }
      _triggers.splice(index, 1);
      TriggerStore.__emitChange();
      break;
  }
}

TriggerStore.all = function () {
  return Object.assign({}, _triggers);
};

module.exports = TriggerStore
