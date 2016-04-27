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
      <div className="col-sm-1 pane">
        <ul className="menu">
          <li id="workflows" className={ selectedItem === AppConstants.WORKFLOWS ? "selected" : "" } onClick={this.handleSelection.bind(this, AppConstants.WORKFLOWS)}><a>Workflows</a></li>
          <li id="triggers" className={ selectedItem === AppConstants.TRIGGERS ? "selected" : "" } onClick={this.handleSelection.bind(this, AppConstants.TRIGGERS)}><a>Triggers</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
