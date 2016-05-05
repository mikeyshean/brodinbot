var React = require('react');
var AppConstants = require('../constants/app_constants');
var TriggerNode = require('../components/trigger_node');
var ResponseNode = require('../components/response_node');
var ActionNode = require('../components/action_node');
var NodeIcons = require('../components/node_icons');
var ClientActions = require('../actions/client_actions');
var GraphUtil = require('../util/graph_util');
var GraphStore = require('../stores/graph');

var Graph = React.createClass({

  componentDidMount: function () {
    this.listener = GraphStore.addListener(this._graphChanged);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  componentDidUpdate: function () {
    if (this.sigma) {this.sigma.kill();}

    var s = this.sigma = this._newSigma()
    var nodes = s.graph.nodes();
    var len = nodes.length;
    var newNodes;

    // Assign Color and Random Position for New Nodes
    for (i = 0; i < len; i++) {
      if (!nodes[i].x) {
        nodes[i].x = Math.random();
        nodes[i].y = Math.random();
        ClientActions.saveNodePosition(nodes[i]);
        newNodes = true;
      }

      this._applyNodeColor(nodes[i]);
    }

    s.refresh();

    // Trigger force-directed graph algorithm if new nodes.
    if (newNodes) {
      s.startForceAtlas2();

      setTimeout(function() {
        s.stopForceAtlas2();
      }, 1000)
    }

    // EventHandler: Save Node Position on Drag
    var dragListener = new sigma.plugins.dragNodes(s, s.renderers[0]);
    dragListener.bind('drop', function(event) {
      ClientActions.saveNodePosition(event.data.node);
      this.dragged = true;
    }.bind(this));

    // EventHandler: Node selection for EditorHelper
    s.bind("clickNode", this._handleNodeClick);

  },

  shouldComponentUpdate: function (newProps) {

    // Reset colors when not editing for same graph
    if (!newProps.editing && this.props.editing
      && this.props.graph === newProps.graph) {

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
  },

  _graphChanged: function () {
    var graphState = GraphStore.all();

    if (graphState.update) {
      var nodeMap = graphState.nodeMap;
      var node = nodeMap.nodes[0];
      var sigmaGraph = this.sigma.graph

      switch (node.group) {
        case "Trigger":
          sigmaGraph.dropNode(this.props.trigger.id)
          break;

        default:
          sigmaGraph.dropNode(this.props.actionable.id)
          break;
      }

      sigmaGraph.read(nodeMap);
      var sigmaNode = sigmaGraph.nodes(node.id);

      this._applyNodeColor(sigmaNode);
      this.sigma.refresh();
    }
  },

  _newSigma: function () {
    return new sigma({
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
  },

  _handleNodeClick: function (event) {
    if (this.dragged) { this.dragged = false; return null;}

    var eventNode = event.data.node
    var workflow_response_id = eventNode.workflow_response_id
    var nodes = this.sigma.graph.nodes();
    var trigger, actionable;

    // Find Trigger and Actionable nodes
    if (eventNode.group === "Trigger") {
      trigger = eventNode;
      actionable = GraphUtil.findActionable(nodes, workflow_response_id);
    } else {
      actionable = eventNode;
      trigger = GraphUtil.findTrigger(nodes, workflow_response_id);
    }

    // Assign selected color if found
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
    this.sigma.refresh();
    ClientActions.selectNode(trigger, actionable);
  }
});

module.exports = Graph;
