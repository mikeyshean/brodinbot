var ServerActions = require('../actions/server_actions');

ApiUtil = {
  fetchWorkflows: function(){
    $.get('api/workflows', function(workflows) {
      ServerActions.receiveAll(workflows);
    });
  }
}

module.exports = ApiUtil;
