var React = require('react');
var AppConstants = require('../constants/app_constants');

var ActionNode = React.createClass({

  render: function() {
    var actionName = "action";
    var styles = {
      border: '2px solid green'
    };

    var children = this.props.childNodes;
    var childrenComponents = children.map(function(child) {
      return this.props.buildChildren(child);
    }.bind(this))

    return (
      <div className={actionName} style={styles}>
        {childrenComponents}
      </div>
    );
  }
});

module.exports = ActionNode;
