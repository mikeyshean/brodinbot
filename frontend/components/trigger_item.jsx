var React = require('react');
var ClientActions = require('../actions/client_actions');

var TriggerItem = React.createClass({

  getInitialState: function () {
    return {
      isHovered: false,
    };
  },

  render: function() {
    var trigger = this.props.trigger
    var className = this.props.isSelected ? "selected" : null;

    var hoverX;
    if (this.state.isHovered) {
      hoverX = <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this._deleteTrigger}></span>
    }

    return (
      <li className={className} onClick={this._handleClick} onMouseEnter={this._handleHover.bind(this, true)} onMouseLeave={this._handleHover.bind(this, false)} >
        <a>{trigger.category}</a>
        {hoverX}
      </li>
    );
  },

  _handleClick: function () {
    var trigger = this.props.trigger;
    this.props._handleSelection(trigger.id);
  },

  _handleHover: function (mouseEnter) {
    if (mouseEnter) {
      this.setState({isHovered: true})
    } else {
      this.setState({isHovered: false})
    }
  },

  _deleteTrigger: function () {
    if (window.confirm("Do you really want to delete this trigger?")) {
      ClientActions.deleteTrigger(this.props.trigger.id);
    }
  }

});

module.exports = TriggerItem;
