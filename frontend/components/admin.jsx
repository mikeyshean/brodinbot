var React = require('react');
var Nav = require('./nav');
var Index = require('./index');
var ClientActions = require('../actions/client_actions');
var AppConstants = require('../constants/app_constants');
var ApplicationStore = require('../stores/application');

var Admin = React.createClass({
  getInitialState: function () {
    return { navSelection: AppConstants.WORKFLOWS }
  },
  componentDidMount: function () {
    this.listener = ApplicationStore.addListener(this._appChanged);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _appChanged: function () {
    this.replaceState(ApplicationStore.state())
  },
  render: function() {
    return (
      <div>
        <Nav navSelection={this.state.navSelection}/>
        <Index index={this.state.navSelection}/>
      </div>
    );
  }
});

module.exports = Admin;
