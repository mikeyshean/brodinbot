var React = require('react');
var CreateWorkflow = require('../components/create_workflow')
var WorkflowStore = require('../stores/workflow');
var ClientActions = require('../actions/client_actions');
var WorkflowItem = require('../components/workflow_item');

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
      var isSelected = this.state.selectedId === workflow.id;

      return <WorkflowItem key={key} isSelected={isSelected} _handleSelection={this._handleSelection} workflow={workflow} />
    }.bind(this));

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
    ClientActions.fetchGraph(id, version);
    this.setState({selectedId: id});
  },
});

module.exports = Workflows;
