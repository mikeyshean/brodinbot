var React = require('react');
var AppConstants = require('../constants/app_constants');

var ResponseNode = React.createClass({

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
        <li className="response">
          <a>{"\""+this.props.body+"\""}</a>
          {childrenComponents}
        </li>
      </ul>
    );
  }
});

module.exports = ResponseNode;
