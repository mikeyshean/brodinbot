var React = require('react');
var WorkflowStore = require('../stores/workflow');
var ClientActions = require('../actions/client_actions');

var Workflows = React.createClass({
  getInitialState: function () {
    return { workflows: WorkflowStore.all() }
  },
  componentDidMount: function () {
    this.listener = WorkflowStore.addListener(this.__workflowsChanged);
    ClientActions.fetchWorkflows();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  __workflowsChanged: function () {
    this.setState({workflows: WorkflowStore.all()})
  },
  loadWorkflow: function(id, version) {
    ClientActions.fetchWorkflow(id, version);
  },
  render: function(){
    var workflows = this.state.workflows;
    var keys = Object.keys(workflows)

    var workflowItems = keys.map(function(key) {
      var workflow = workflows[key];
      return <li key={key} onClick={this.loadWorkflow.bind(this, workflow.id, workflow.current_version)}>{workflow.name}</li>
    }.bind(this))

    return (
      <ul>
        { workflowItems }
      </ul>

    );
  }
});

module.exports = Workflows;
