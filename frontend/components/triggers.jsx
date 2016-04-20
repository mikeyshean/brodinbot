var React = require('react');
var TriggerStore = require('../stores/trigger');
var ClientActions = require('../actions/client_actions');

var Triggers = React.createClass({
  getInitialState: function () {
    return { triggers: TriggerStore.all() }
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
      return <li key={key}>{triggers[key].category}</li>
    })

    return (
      <ul>
        { triggerItems }
      </ul>

    );
  }
});

module.exports = Triggers;
