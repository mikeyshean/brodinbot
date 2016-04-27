var ServerActions = require('../actions/server_actions');
var FormActions = require('../actions/form_actions');

ApiUtil = {

  fetchUsers: function(){
    $.get('api/users', function(users) {
      ServerActions.receiveAllUsers(users);
    });
  },

  deleteUser: function(id) {
    $.delete('api/users/'+id, function() {
      ServerActions.deleteUser(id);
    })
  },

  fetchWorkflows: function(){
    $.get('api/workflows', function(workflows) {
      ServerActions.receiveAllWorkflows(workflows);
    });
  },

  createWorkflow: function(data) {
    $.post('api/workflows', {workflow: data}, function(workflow) {
      ServerActions.receiveWorkflow(workflow);
      FormActions.clearFormErrors();
    }).fail(function (resp) {
      ServerActions.receiveFormErrors(resp.responseJSON.errors);
    });
  },

  deleteWorkflow: function(id) {
    $.delete('api/workflows/'+id, function() {
      ServerActions.deleteWorkflow(id);
    })
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
