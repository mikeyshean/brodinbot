var React = require('react');
var WorkflowStore = require('../stores/workflow');
var ClientActions = require('../actions/client_actions');
var AppConstants = require('../constants/app_constants');

var Nav = React.createClass({
  handleSelection: function(selectedItem) {
    ClientActions.selectNavItem(selectedItem);
  },
  render: function() {
    var selectedItem = this.props.navSelection;
    return (
      <ul>
        <li id="workflows" className={ selectedItem === AppConstants.WORKFLOWS ? "selected" : "" } onClick={this.handleSelection.bind(this, AppConstants.WORKFLOWS)}>Workflows</li>
        <li id="triggers" className={ selectedItem === AppConstants.TRIGGERS ? "selected" : "" } onClick={this.handleSelection.bind(this, AppConstants.TRIGGERS)}>Triggers</li>
      </ul>

    );
  }
});

module.exports = Nav;
