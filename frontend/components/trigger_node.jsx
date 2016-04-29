var React = require('react');
var AppConstants = require('../constants/app_constants');

var TriggerNode = React.createClass({
  render: function() {
    return (
      <li className="trigger">
        <a>{this.props.category || "default"}</a>
        {this.props.children}
      </li>

    );
  }
});

module.exports = TriggerNode;
