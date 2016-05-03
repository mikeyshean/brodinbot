var React = require('react');
var Nav = require('./nav');
var Index = require('./index');
var Graph = require('./graph');
var ClientActions = require('../actions/client_actions');
var AppConstants = require('../constants/app_constants');
var ApplicationStore = require('../stores/application');

var Admin = React.createClass({
  getInitialState: function () {
    return ApplicationStore.state()
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
      <div id="app-wrapper">
        <Nav navSelection={this.state.navSelection}/>
        <Index index={this.state.navSelection}/>
        <div className="pane" id="editor">
          <Graph graph={this.state.graph} />
        </div>
      </div>
    );
  }
});

module.exports = Admin;
