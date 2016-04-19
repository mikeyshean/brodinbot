var React = require('react');
var ReactDOM = require('react-dom');
require('./util/api_util');
require('./stores/workflow');
var MyComponent = React.createClass({
  render: function () {
    return(
      <div>Hello World</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('app'));
});
