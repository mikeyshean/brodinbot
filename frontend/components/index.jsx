var React = require('react');
var AppConstants = require('../constants/app_constants');
var Workflows = require('../components/workflows');
var Triggers = require('../components/triggers');

var Index = React.createClass({
  getInitialState: function () {
    return { selectedIndex: this.props.selectedIndex }
  },
  render: function() {
    var selectedIndex = this.props.selectedIndex
    var index;
    if (selectedIndex == AppConstants.WORKFLOWS) {
      index = <Workflows />
    } else if (selectedIndex == AppConstants.TRIGGERS) {
      index = <Triggers />
    }

    return (
      index
    );
  }
});

module.exports = Index;
