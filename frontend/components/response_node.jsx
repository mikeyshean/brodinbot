var React = require('react');
var AppConstants = require('../constants/app_constants');
var ClientActions = require('../actions/client_actions');
var NodeIcons = require('./node_icons');

var ResponseNode = React.createClass({

  getInitialState: function () {
    return {isHovered: false};
  },

  render: function() {
    var children = this.props.workflow.children;
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
      nodeIcons = <NodeIcons newWorkflowResponse={this._newWorkflowResponse} />
    }

    return (
      <ul>
        <li className="response">
          <a onMouseEnter={this._handleHover.bind(this, true)} onMouseLeave={this._handleHover.bind(this, false)}>
            {"\""+this.props.body+"\""}
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
    var workflow = this.props.workflow;
    ClientActions.createWorkflowResponse(
      workflow.id,
      workflow.workflow_id,
      workflow.version
    );
  }
});

module.exports = ResponseNode;
