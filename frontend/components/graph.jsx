var React = require('react');
var AppConstants = require('../constants/app_constants');
var TriggerNode = require('../components/trigger_node');
var ResponseNode = require('../components/response_node');
var ActionNode = require('../components/action_node');
var NodeIcons = require('../components/node_icons');
var ClientActions = require('../actions/client_actions');
var GraphUtil = require('../util/graph_util');

var Graph = React.createClass({

  componentDidUpdate: function () {
    if (this.sigma) { this.sigma.kill();}

    var s = this.sigma = new sigma({
      graph: this.props.graph,
      container: 'graph',
      renderer: {
        container: document.getElementById('graph'),
        type: 'canvas'
      },
      settings: {
          defaultLabelColor: '#fff',
          defaultEdgeType: "curvedArrow",
          minArrowSize: 10
      }
    });

    var nodes = s.graph.nodes();
    var len = nodes.length;
    var reset;

    for (i = 0; i < len; i++) {
      if (!nodes[i].x) {
        nodes[i].x = Math.random();
        nodes[i].y = Math.random();
        ClientActions.saveNodePosition(nodes[i]);
        reset = true;
      }

      this._applyNodeColor(nodes[i]);
    }

    s.refresh();

    // Trigger force-directed graph algorithm if new nodes.
    if (reset) {
      s.startForceAtlas2();

      setTimeout(function() {
        s.stopForceAtlas2();
      }, 1000)
    }

    var dragListener = new sigma.plugins.dragNodes(s, s.renderers[0]);
    dragListener.bind('drop', function(event) {
      ClientActions.saveNodePosition(event.data.node);
    });

    // Editor Helper Event Handler
    s.bind("clickNode", function (event) {
      var eventNode = event.data.node
      var workflow_response_id = eventNode.workflow_response_id
      var nodes = s.graph.nodes();
      var trigger, actionable;

      if (eventNode.group === "Trigger") {
        trigger = eventNode;
        actionable = GraphUtil.findActionable(nodes, workflow_response_id);
      } else {
        actionable = eventNode;
        trigger = GraphUtil.findTrigger(nodes, workflow_response_id);
      }

      if (trigger) {
        trigger.color = AppConstants.TRIGGER_COLOR
      }
      actionable.color = AppConstants.ACTIONABLE_COLOR;

      // Gray out non-selected nodes
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ((trigger && ((node.id !== trigger.id) && (node.id !== actionable.id))) || (!trigger && (node.id !== actionable.id)))  {
          node.color = AppConstants.FADED_COLOR;
        }
      }
      s.refresh();
      ClientActions.selectNode(trigger, actionable);
    });
  },

  shouldComponentUpdate: function (newProps) {
    if (!newProps.editing && this.sigma) {
      var nodes = this.sigma.graph.nodes();
      for (var i = 0; i < nodes.length; i++) {
        this._applyNodeColor(nodes[i]);
      }
      this.sigma.refresh();
    }
    return this.props.graph !== newProps.graph
  },

  render: function() {

    return (
      <div id="graph">

      </div>
    );
  },

  _applyNodeColor: function (node) {
    if (node.is_root) {
      node.color = AppConstants.ROOT_COLOR;
    } else {
      switch(node.group) {
        case "Trigger":
        node.color = AppConstants.TRIGGER_COLOR;
        break;

        case "Action":
        node.color = AppConstants.ACTIONABLE_COLOR;
        break;

        case "Response":
        node.color = AppConstants.RESPONSE_COLOR;
        break;
      }
    }
  },

  _deleteWorkflowResponse: function (workflowResponse) {
    if (window.confirm("Do you really want to delete this workflow item AND all children items?")) {
      ClientActions.deleteWorkflowResponse(workflowResponse);
    }
  }
});

module.exports = Graph;
