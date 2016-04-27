var React = require('react');
var CreateWorkflow = require('../components/create_workflow')
var WorkflowStore = require('../stores/workflow');
var ClientActions = require('../actions/client_actions');

var Workflows = React.createClass({

  getInitialState: function () {
    return {
      workflows: WorkflowStore.all(),
      selectedId: null
    }
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
      var workflow = workflows[key];
      var className = this.state.selectedId === workflow.id ? "selected" : null;

      return <li key={key} className={className} onClick={this._handleSelection.bind(this, workflow.id, workflow.current_version)}><a>{workflow.name}</a></li>
    }.bind(this))

    return (
      <div>
        <CreateWorkflow />
        <ul className="menu">
          { workflowItems }
        </ul>
      </div>

    );
  },

  _handleSelection: function(id, version) {
    ClientActions.fetchTree(id, version);
    this.setState({selectedId: id});
  },
});

module.exports = Workflows;
