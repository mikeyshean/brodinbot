var ApiUtil = require('../util/api_util');
var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ClientActions = {
  fetchUsers: ApiUtil.fetchUsers,

  deleteUser: ApiUtil.deleteUser,

  fetchWorkflows: ApiUtil.fetchWorkflows,

  createWorkflow: ApiUtil.createWorkflow,

  deleteWorkflow: ApiUtil.deleteWorkflow,

  fetchTriggers: ApiUtil.fetchTriggers,

  fetchActionables: ApiUtil.fetchActionables,

  saveWorkflowResponseTrigger: ApiUtil.saveWorkflowResponseTrigger,

  saveWorkflowResponseActionable: ApiUtil.saveWorkflowResponseActionable,

  deleteTrigger: ApiUtil.deleteTrigger,

  createWorkflowResponse: ApiUtil.createWorkflowResponse,

  deleteWorkflowResponse: ApiUtil.deleteWorkflowResponse,

  saveNodePosition: ApiUtil.saveNodePosition,

  selectNode: function (trigger, actionable) {
    this.fetchTriggers();
    this.fetchActionables(actionable.group);

    AppDispatcher.dispatch({
      actionType: AppConstants.NODE_SELECTED,
      trigger: trigger,
      actionable: actionable
    });
  },

  fetchGraph: ApiUtil.fetchGraph,

  selectNavItem: function (navSelection) {
    AppDispatcher.dispatch({
      actionType: AppConstants.NAV_SELECTED,
      navSelection: navSelection
    });
  },

  closeEditor: function () {
    AppDispatcher.dispatch({
      actionType: AppConstants.EDITOR_CLOSED
    });
  }

};

module.exports = ClientActions;
