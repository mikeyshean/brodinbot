var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _messages = [];
var FormStore = new Store(AppDispatcher);

var reset = function (messages) {
  _messages = messages;
};

var clear = function () {
  _messages = [];
};

FormStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AppConstants.FORM_ERRORS_RECEIVED:
      reset(payload.messages);
      FormStore.__emitChange();
      break;
    case AppConstants.FORM_ERRORS_CLEARED:
      clear();
      FormStore.__emitChange();
      break;
  }
};

FormStore.all = function () {
  return _messages.slice();
};

module.exports = FormStore
