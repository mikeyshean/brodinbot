var React = require('react');
var ReactDOM = require('react-dom');
var Admin = require('./components/admin');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Admin />,
    document.getElementById('app')
  );
});
