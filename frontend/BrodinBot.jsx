var React = require('react');
var ReactDOM = require('react-dom');
var Index = require('./components/index');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Index />, document.getElementById('app'));
});
