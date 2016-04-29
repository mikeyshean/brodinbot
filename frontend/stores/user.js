var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _users = [];
var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case AppConstants.USERS_RECEIVED:
      _users = payload.users;
      UserStore.__emitChange();
      break;

    case AppConstants.USER_RECEIVED:
      _users.push(payload.workflow);
      UserStore.__emitChange();
      break;

    case AppConstants.USER_DELETED:
      var index;
      for (var i = 0; i < _users.length; i++) {
        if (_users[i].id === payload.user.id) {
          index = i;
          break;
        }
      }
      _users.splice(index, 1);
      UserStore.__emitChange();
      break;
  }
}

UserStore.all = function () {
  return Object.assign({}, _users);
};

module.exports = UserStore
