var React = require('react');
var Nav = require('./nav');
var Index = require('./index');
var Graph = require('./graph');
var EditorHelper = require('./editor_helper');
var ClientActions = require('../actions/client_actions');
var AppConstants = require('../constants/app_constants');
var ApplicationStore = require('../stores/application');

/***************************

Highest component in hierarchy for Admin App.

- Responds to changes in ApplicationStore
- Holds Navigation Menu, Index View, & Editor


***************************/

var Admin = React.createClass({

  getInitialState: function () {
    return ApplicationStore.state()
  },

  // Responds to events to ApplicationStore
  componentDidMount: function () {
    this.listener = ApplicationStore.addListener(this._appChanged);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _appChanged: function () {
    this.replaceState(ApplicationStore.state())
  },

  render: function() {
    var editing = this.state.trigger || this.state.actionable;
    if (editing) {
      var workflowResponseId = this.state.actionable.workflow_response_id;
    }
    return (
      <div id="app-wrapper">
        <Nav navSelection={this.state.navSelection}/>
        <Index index={this.state.navSelection}/>
        <div className="pane" id="editor">
          <Graph
            graph={this.state.graph}
            editing={editing}
            actionable={this.state.actionable}
            trigger={this.state.trigger}
          />
          <EditorHelper
            trigger={this.state.trigger}
            triggers={this.state.triggers}
            actionable={this.state.actionable}
            actionables={this.state.actionables}
            workflowResponseId={workflowResponseId}
          />
        </div>
      </div>
    );
  }
});

module.exports = Admin;
