var React = require('react');
var PropTypes = React.PropTypes;

var NodeIcons = React.createClass({

  render: function() {
    return (
      <div className="icon-wrapper">
        <span className="glyphicon glyphicon-plus node-icon" onClick={this.props.newWorkflowResponse}></span>
        <span className="glyphicon glyphicon-wrench node-icon"></span>
        <span className="glyphicon glyphicon-remove node-icon" onClick={this.props.deleteWorkflowResponse}></span>
      </div>
    );
  }

});

module.exports = NodeIcons;
