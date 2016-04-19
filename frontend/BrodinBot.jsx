var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/Dispatcher')
module.exports = Dispatcher;
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
