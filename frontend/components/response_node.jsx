var React = require('react');
var AppConstants = require('../constants/app_constants');

var ResponseNode = React.createClass({

  render: function() {
    var responseName = "response";
    var styles = {
      border: '2px solid yellow'
    };

    var children = this.props.childNodes;
    var childrenComponents = children.map(function(child) {
      return this.props.buildChildren(child);
    }.bind(this))

    return (
      <div className={responseName} style={styles}>
        {childrenComponents}
      </div>
    );
  }
});

module.exports = ResponseNode;
