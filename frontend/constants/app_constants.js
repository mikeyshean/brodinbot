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
  WORKFLOW_RESPONSE_TRIGGER_RECEIVED: null,
  TRIGGER_DELETED: null,
  NAV_SELECTED: null,
  FORM_ERRORS_RECEIVED: null,
  FORM_ERRORS_CLEARED: null,
  EDITOR_CLOSED: null
})

AppConstants = Object.assign(AppConstants, {
  ACTIONABLE_COLOR: "green",
  TRIGGER_COLOR: "yellow",
  RESPONSE_COLOR: "#fff",
  ROOT_COLOR: "red",
  FADED_COLOR: "gray",
})

module.exports = AppConstants
