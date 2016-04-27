var React = require('react');
var AppConstants = require('../constants/app_constants');

var ActionNode = React.createClass({

  render: function() {
    var children = this.props.childNodes;
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
    return (
      <ul>
        <li className="action">
          <a>{this.props.method}</a>
          {childrenComponents}
        </li>
      </ul>
    );
  }
});

module.exports = ActionNode;
