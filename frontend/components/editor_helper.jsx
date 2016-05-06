var React = require('react');
var ClientActions = require('../actions/client_actions');

var EditorHelper = React.createClass({
  getInitialState: function () {
    return {
      WorkflowResponseId: this.props.WorkflowResponseId,
    }
  },

  render: function() {
    if (!this.props.triggers || !this.props.actionable) { return null;}

    // Create trigger drop-down

    var triggerOptions = this.props.triggers.map(function (trigger) {
      return (
        <option key={trigger.id} value={trigger.id}>{trigger.category}</option>
      )
    }.bind(this));

    // Create actionable drop-down

    var actionableOptions = this.props.actionables.map(function (actionable) {
      return (
        <option key={actionable.id} value={actionable.id}>{actionable.label}</option>
      )
    }.bind(this));

    // Assign default drop-down selection
    var actionableId = this.props.actionable ? this.props.actionable.actionable_id : "0";
    var triggerId = this.props.trigger ? this.props.trigger.trigger_id : "0";

    // Create form components
    var trigger = (
      <form>
        <label for="triggers">
          Trigger:
        </label>
        <select name="triggers" onChange={this._handleTriggerSelection} value={triggerId}>
          <option>Select Trigger</option>
          {triggerOptions}
        </select>
      </form>
    );

    var actionable = (
      <form>
        <label for="actionables">
          {this.props.actionable.group}:
        </label>
        <select name="actionables" onChange={this._handleActionableSelection} value={actionableId}>
          <option>Select {this.props.actionable.group}</option>
          {actionableOptions}
        </select>
      </form>
    );

    return (
      <div id="editor-helper">
        <a id="create-response" onClick={this._createWorkflowResponse}>
          <span className="glyphicon glyphicon-plus"></span>
          Add Response
        </a>
        <a id="create-action" onClick={this._createWorkflowResponse}>
          <span className="glyphicon glyphicon-plus"></span>
          Add Action
        </a>
        <span className="glyphicon glyphicon-remove" onClick={this._closeEditorHelper}></span>
        {trigger}
        {actionable}
      </div>
    );
  },

  _closeEditorHelper: function () {
    ClientActions.closeEditor();
  },

  _handleTriggerSelection: function (event) {
    var triggerId = event.target.value;
    ClientActions.saveWorkflowResponseTrigger(triggerId, this.props.workflowResponseId)
  },

  _handleActionableSelection: function (event) {
    var actionableId = event.target.value;
    var group = this.props.actionable.group;

    ClientActions.saveWorkflowResponseActionable(actionableId, group, this.props.workflowResponseId)
  }

});

module.exports = EditorHelper;
