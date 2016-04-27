var React = require('react');
var TriggerStore = require('../stores/trigger');
var ClientActions = require('../actions/client_actions');
var TriggerItem = require('../components/trigger_item');

var Triggers = React.createClass({

  getInitialState: function () {
    return {
      triggers: TriggerStore.all(),
      selectedId: null
    }
  },

  componentDidMount: function () {
    this.listener = TriggerStore.addListener(this.__triggersChanged);
    ClientActions.fetchTriggers();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  __triggersChanged: function () {
    this.setState({triggers: TriggerStore.all()})
  },

  render: function(){
    var triggers = this.state.triggers;
    var keys = Object.keys(triggers)

    var triggerItems = keys.map(function(key) {
      var trigger = triggers[key];
      var isSelected = this.state.selectedId === trigger.id;

      return <TriggerItem key={key} isSelected={isSelected} _handleSelection={this._handleSelection} trigger={trigger} />
    }.bind(this))

    return (
      <ul className="menu">
        { triggerItems }
      </ul>

    );
  },

  _handleSelection: function (id) {
    this.setState({selectedId: id});
  }
});

module.exports = Triggers;
