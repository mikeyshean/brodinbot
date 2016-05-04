var React = require('react');
var ClientActions = require('../actions/client_actions');

var EditorHelper = React.createClass({

  render: function() {
    var trigger, actionable, closeButton;

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

    if (this.props.trigger) {
      trigger = (
        <form>
          <label>
            Trigger:
            <input type="text" placeholder={this.props.trigger.label}></input>
          </label>
        </form>
      );
    }

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
  }

});

module.exports = EditorHelper;
