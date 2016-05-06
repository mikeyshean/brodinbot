var keyMirror = require('keymirror');

var AppConstants = keyMirror({
  WORKFLOWS: null,
  TRIGGERS: null,
  USERS: null,
  USERS_RECEIVED: null,
  USER_DELETED: null,
  WORKFLOWS_RECEIVED: null,
  WORKFLOW_RECEIVED: null,
  WORKFLOW_DELETED: null,
  WORKFLOW_SELECTED: null,
  GRAPH_RECEIVED: null,
  NODE_SELECTED: null,
  TRIGGERS_RECEIVED: null,
  ACTIONABLES_RECEIVED: null,
  WORKFLOW_RESPONSE_TRIGGER_RECEIVED: null,
  WORKFLOW_RESPONSE_ACTIONABLE_RECEIVED: null,
  TRIGGER_DELETED: null,
  NAV_SELECTED: null,
  FORM_ERRORS_RECEIVED: null,
  FORM_ERRORS_CLEARED: null,
  EDITOR_CLOSED: null
})

AppConstants = Object.assign(AppConstants, {
  ACTION_COLOR: "yellow",
  TRIGGER_COLOR: "red",
  RESPONSE_COLOR: "green",
  ROOT_COLOR: "#fff",
  FADED_COLOR: "gray",
})

module.exports = AppConstants
