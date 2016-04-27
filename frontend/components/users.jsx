var React = require('react');
var UserStore = require('../stores/user');
var ClientActions = require('../actions/client_actions');
var UserItem = require('../components/user_item');

var Users = React.createClass({

  getInitialState: function () {
    return {
      users: UserStore.all(),
      selectedId: null
    }
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this.__usersChanged);
    ClientActions.fetchUsers();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  __usersChanged: function () {
    this.setState({users: UserStore.all()})
  },

  render: function(){
    var users = this.state.users;
    var keys = Object.keys(users)

    var userItems = keys.map(function(key) {
      var user = users[key];
      var isSelected = this.state.selectedId === user.id;

      return <UserItem key={key} isSelected={isSelected} _handleSelection={this._handleSelection} user={user} />
    }.bind(this));

    return (
      <div>
        <ul className="menu">
          { userItems }
        </ul>
      </div>

    );
  },

  _handleSelection: function(id) {
    this.setState({selectedId: id});
  },
});

module.exports = Users;
