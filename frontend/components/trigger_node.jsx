var React = require('react');
var AppConstants = require('../constants/app_constants');

var TriggerNode = React.createClass({
  render: function() {
    var triggerName = "trigger";

    return (
      <li className={triggerName}>
        <a>Trigger</a>
        {this.props.children}
      </li>

    );
  }
});

module.exports = TriggerNode;
