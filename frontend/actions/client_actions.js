var ApiUtil = require('../util/api_util');
var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ClientActions = {

  fetchWorkflows: ApiUtil.fetchWorkflows,

  createWorkflow: ApiUtil.createWorkflow,

  deleteWorkflow: ApiUtil.deleteWorkflow,

  fetchTree: ApiUtil.fetchTree,

  fetchTriggers: ApiUtil.fetchTriggers,

  selectNavItem: function (navSelection) {
    AppDispatcher.dispatch({
      actionType: AppConstants.NAV_SELECTED,
      navSelection: navSelection
    });
  },

};

module.exports = ClientActions;
