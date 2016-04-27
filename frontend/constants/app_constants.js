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
  TREE_RECEIVED: null,
  TRIGGERS_RECEIVED: null,
  TRIGGER_DELETED: null,
  NAV_SELECTED: null,
  FORM_ERRORS_RECEIVED: null,
  FORM_ERRORS_CLEARED: null,
})

module.exports = AppConstants
