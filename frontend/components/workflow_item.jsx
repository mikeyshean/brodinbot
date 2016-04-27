var React = require('react');
var ClientActions = require('../actions/client_actions');

var WorkflowItem = React.createClass({

  getInitialState: function () {
    return {
      isHovered: false,
    };
  },

  render: function() {
    var workflow = this.props.workflow
    var className = this.props.isSelected ? "selected" : null;
    var id = workflow.id;
    var version = workflow.current_version;

    var hoverX;
    if (this.state.isHovered) {
      hoverX = <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this._deleteWorkflow}></span>
    }

    return (
      <li className={className} onClick={this._handleClick} onMouseEnter={this._handleHover.bind(this, true)} onMouseLeave={this._handleHover.bind(this, false)} >
        <a>{workflow.name}</a>
        {hoverX}
      </li>
    );
  },

  _handleClick: function () {
    var workflow = this.props.workflow;
    this.props._handleSelection(workflow.id, workflow.current_version);
  },

  _handleHover: function (mouseEnter) {
    if (mouseEnter) {
      this.setState({isHovered: true})
    } else {
      this.setState({isHovered: false})
    }
  },

  _deleteWorkflow: function () {
    if (window.confirm("Do you really want to delete this workflow?")) {
      ClientActions.deleteWorkflow(this.props.workflow.id);
    }
  }

});

module.exports = WorkflowItem;
