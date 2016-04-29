var React = require('react');
var AppConstants = require('../constants/app_constants');
var TriggerNode = require('../components/trigger_node');
var ResponseNode = require('../components/response_node');
var ActionNode = require('../components/action_node');
var NodeIcons = require('../components/node_icons');

var Tree = React.createClass({
  buildChildren: function (node) {
    var actionType = node.actionable_type,
        actionable = node.actionable;
    var trigger = node.trigger,
        triggerId = trigger ? trigger.id : null,
        triggerCategory = trigger ? trigger.category : null;
    var actionComponent;

    if (actionType === "Action") {
      actionComponent = <ActionNode
        key={node.id}
        workflow={node}
        method={actionable.method}
        buildChildren={this.buildChildren}
        />
    } else if (actionType === "Response") {
      actionComponent = <ResponseNode
        key={node.id}
        workflow={node}
        body={actionable.body}
        buildChildren={this.buildChildren}
        />
    } else {
      actionComponent = (
        <ul>
          <li className="select-actionable">
            <a>
              A
              <NodeIcons />
            </a>
          </li>
        </ul>
      )
    }

    return (
      <TriggerNode
        key={node.id}
        category={triggerCategory}
        buildChildren={this.buildChildren}
        >
        {actionComponent}
      </TriggerNode>

    );
  },
  render: function() {
    if (!this.props.tree) {return null;}

    var tree = this.buildChildren(this.props.tree);

    return (
      <div className="tree">
        <ul>
          {tree}
        </ul>
      </div>
    );
  }
});

module.exports = Tree;
