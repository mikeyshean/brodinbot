var React = require('react');
var AppConstants = require('../constants/app_constants');

var ResponseNode = React.createClass({

  render: function() {
    var responseName = "response";

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
        <li>
          <a className={responseName}>Response</a>
          {childrenComponents}
        </li>
      </ul>
    );
  }
});

module.exports = ResponseNode;
