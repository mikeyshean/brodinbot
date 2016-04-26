var React = require('react');
var AppConstants = require('../constants/app_constants');
var ClientActions = require('../actions/client_actions');

var CreateWorkflow = React.createClass({
  getInitialState: function () {
    return {name: ""};
  },

  submitForm: function (e) {
    e.preventDefault();

    ClientActions.createWorkflow(this.state);
  },

  render: function() {
    return (
      <form onSubmit={this.submitForm}>
        <input type="text"
          id="workflow-name"
          name="name"
          value={this.state.name}
          placeholder="Workflow name..."
          onChange={this._handleChange}
        />
        <button>Add</button>
      </form>
    );
  },

  _handleChange: function (e) {
    this.setState({name: e.target.value});
  }
});

module.exports = CreateWorkflow;
