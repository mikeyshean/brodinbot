var React = require('react');
var ClientActions = require('../actions/client_actions');

var UserItem = React.createClass({

  getInitialState: function () {
    return {
      isHovered: false,
    };
  },

  render: function() {
    var user = this.props.user
    var className = this.props.isSelected ? "selected" : null;

    var hoverX;
    if (this.state.isHovered) {
      hoverX = <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this._deleteUser}></span>
    }

    return (
      <li className={className} onClick={this._handleClick} onMouseEnter={this._handleHover.bind(this, true)} onMouseLeave={this._handleHover.bind(this, false)} >
        <a>{user.name_full}<br/>{user.phone_number.replace(/(\d{4}$)/, "XXXX")}</a>
        {hoverX}
      </li>
    );
  },

  _handleClick: function () {
    var user = this.props.user;
    this.props._handleSelection(user.id);
  },

  _handleHover: function (mouseEnter) {
    if (mouseEnter) {
      this.setState({isHovered: true})
    } else {
      this.setState({isHovered: false})
    }
  },

  _deleteUser: function () {
    if (window.confirm("Do you really want to delete this user?")) {
      ClientActions.deleteUser(this.props.user.id);
    }
  }

});

module.exports = UserItem;
