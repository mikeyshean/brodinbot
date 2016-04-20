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
  render: function(){
    var workflows = this.state.workflows;
    var keys = Object.keys(workflows)

    var workflowItems = keys.map(function(key) {
      return <li key={key}>{workflows[key].name}</li>
    })

    return (
      <ul>
        { workflowItems }
      </ul>

    );
  }
});

module.exports = Workflows;
