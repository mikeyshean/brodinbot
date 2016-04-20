var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchWorkflows: ApiUtil.fetchWorkflows,
  fetchTriggers: ApiUtil.fetchTriggers
};

module.exports = ClientActions;
