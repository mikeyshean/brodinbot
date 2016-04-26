var React = require('react');
var AppConstants = require('../constants/app_constants');
var ClientActions = require('../actions/client_actions');
var FormStore = require('../stores/form');

var CreateWorkflow = React.createClass({
  getInitialState: function () {
    return {
      name: "",
      errorMessages: []
    };
  },

  submitForm: function (e) {
    e.preventDefault();

    ClientActions.createWorkflow(this.state);
  },

  componentDidMount: function () {
    this.formListener = FormStore.addListener(this._onFormError);
  },

  componentWillUnmount: function () {
    this.formListener.remove();
  },

  render: function() {
    var messages = this.state.errorMessages.map(function (msg) {
      return (
        <li>{msg}</li>
      )
    })
    return (
      <form onSubmit={this.submitForm}>
        <div>
          {messages}
        </div>
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
  },

  _onFormError: function () {
    var messages = FormStore.all();
    if (messages.length) {
      this.setState({errorMessages: messages});
    } else {
      this.setState({errorMessages: messages, name: ""});
    }
  }
});

module.exports = CreateWorkflow;
