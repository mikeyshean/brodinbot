var ServerActions = require('../actions/server_actions');

ApiUtil = {

  fetchWorkflows: function(){
    $.get('api/workflows', function(workflows) {
      ServerActions.receiveAllWorkflows(workflows);
    });
  },

  createWorkflow: function(data) {
    $.post('api/workflows', {workflow: data}, function(workflow) {
      ServerActions.receiveWorkflow(workflow);
    });
  },

  fetchTree: function(id,version){
    var url = 'api/workflows/'+id+"?version="+version;

    $.get(url, function(tree) {
      ServerActions.receiveTree(tree);
    });
  },

  fetchTriggers: function(){
    $.get('api/triggers', function(triggers) {
      ServerActions.receiveAllTriggers(triggers);
    });
  }
}

module.exports = ApiUtil;
