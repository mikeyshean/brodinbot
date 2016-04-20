var React = require('react');
var Nav = require('./nav');
var Index = require('./index');
var AppConstants = require('../constants/app_constants');

var Admin = React.createClass({
  getInitialState: function () {
    return { index: AppConstants.WORKFLOWS }
  },
  changeSelection: function (selectedOption) {
    if (this.state.index !== selectedOption) {
      this.setState({index: selectedOption});
    }
  },
  render: function() {
    return (
      <div>
        <Nav changeSelection={this.changeSelection}/>
        <Index selectedIndex={this.state.index}/>
      </div>
    );
  }
});

module.exports = Admin;
