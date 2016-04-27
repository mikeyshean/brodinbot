var React = require('react');
var AppConstants = require('../constants/app_constants');
var Workflows = require('../components/workflows');
var Triggers = require('../components/triggers');
var Users = require('../components/users');

var Index = React.createClass({
  render: function() {
    var index = this.props.index
    var indexComponent;
    switch(index) {
      case AppConstants.WORKFLOWS:
        indexComponent = <Workflows />;
        break;

      case AppConstants.TRIGGERS:
        indexComponent = <Triggers />;
        break;

      case AppConstants.USERS:
        indexComponent = <Users />;
        break;

    }

    return (
      <div id="index" className="pane">
        {indexComponent}
      </div>
    );
  }
});

module.exports = Index;
