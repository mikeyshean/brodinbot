var ServerActions = require('../actions/server_actions');

ApiUtil = {
  fetchWorkflows: function(){
    $.get('api/workflows', function(workflows) {
      ServerActions.receiveAllWorkflows(workflows);
    });
  },
  fetchWorkflow: function(id,version){
    var url = 'api/workflows/'+id+"?version="+version;
    
    $.get(url, function(workflow) {
      ServerActions.receiveWorkflow(workflow);
    });
  },
  fetchTriggers: function(){
    $.get('api/triggers', function(triggers) {
      ServerActions.receiveAllTriggers(triggers);
    });
  }
}

module.exports = ApiUtil;
