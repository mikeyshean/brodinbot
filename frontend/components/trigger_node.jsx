var React = require('react');
var AppConstants = require('../constants/app_constants');

var TriggerNode = React.createClass({
  render: function() {
    var triggerName = "trigger";
    var styles = {
      border: '2px solid orange'
    }
    return (
      <div className={triggerName} style={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TriggerNode;
