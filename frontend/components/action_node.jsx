var React = require('react');
var AppConstants = require('../constants/app_constants');
var ClientActions = require('../actions/client_actions');
var NodeIcons = require('./node_icons');

var ActionNode = React.createClass({

  getInitialState: function () {
    return {isHovered: false};
  },

  render: function() {
    var children = this.props.workflowResponse.children;
    var childrenComponents = children.map(function(child) {
      return this.props.buildChildren(child);
    }.bind(this))

    if (childrenComponents.length) {
      childrenComponents = (
        <ul>
          {childrenComponents}
        </ul>
      );
    }

    var nodeIcons;
    if (this.state.isHovered) {
      nodeIcons = (
        <NodeIcons
          newWorkflowResponse={this._newWorkflowResponse}
          deleteWorkflowResponse={this._deleteWorkflowResponse}
        />
      )
    }

    return (
      <ul>
        <li className="action">
          <a onMouseEnter={this._handleHover.bind(this, true)} onMouseLeave={this._handleHover.bind(this, false)}>
            {this.props.method}
            {nodeIcons}
          </a>
          {childrenComponents}
        </li>
      </ul>
    );
  },

  _handleHover: function (entering) {
    if (entering) {
      this.setState({isHovered: true})
    } else {
      this.setState({isHovered: false})
    }
  },

  _newWorkflowResponse: function () {
    var workflowResponse = this.props.workflowResponse;
    ClientActions.createWorkflowResponse(
      workflowResponse.id,
      workflowResponse.workflow_id,
      workflowResponse.version
    );
  },

  _deleteWorkflowResponse: function () {
    var workflowResponse = this.props.workflowResponse;
    if (window.confirm("Do you really want to delete this workflow item AND all children items?")) {
      ClientActions.deleteWorkflowResponse(workflowResponse);
    }
  }
});

module.exports = ActionNode;
