var React = require('react');
var ClientActions = require('../actions/client_actions');

var EditorHelper = React.createClass({
  getInitialState: function () {
    return {
      WorkflowResponseId: this.props.WorkflowResponseId,
    }
  },

  render: function() {
    var trigger, actionable, closeButton;
    if (!this.props.triggers) { return null;}

    if (this.props.actionable) {
      actionable = (
        <form>
          <label>
            Actionable:
            <input type="text" placeholder={this.props.actionable.label}></input>
          </label>
        </form>
      );

      closeButton = <span className="glyphicon glyphicon-remove" onClick={this._closeEditorHelper}></span>;
    } else {
      return null;
    }

    var triggerOptions = this.props.triggers.map(function (trigger) {
      return (
        <option key={trigger.id} value={trigger.id}>{trigger.category}</option>
      )
    }.bind(this));

    var triggerId = this.props.trigger ? this.props.trigger.trigger_id : "";

    trigger = (
      <form>
        <label>
          Trigger:
          <select name="triggers" onChange={this._handleTriggerSelection} value={triggerId}>
            {triggerOptions}
          </select>
        </label>
      </form>
    );

    return (
      <div id="editor-helper">
        {closeButton}
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
  }

});

module.exports = EditorHelper;
