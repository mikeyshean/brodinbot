var React = require('react');
var AppConstants = require('../constants/app_constants');
var TriggerNode = require('../components/trigger_node');
var ResponseNode = require('../components/response_node');
var ActionNode = require('../components/action_node');
var NodeIcons = require('../components/node_icons');
var ClientActions = require('../actions/client_actions');

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

      if (nodes[i].is_root) {
        nodes[i].color = "red";
      } else {
        switch(nodes[i].group) {
          case "Trigger":
          nodes[i].color = "yellow";
          break;

          case "Action":
          nodes[i].color = "green";
          break;

          default:
          nodes[i].color = "#fff";
        }
      }


    }

    s.refresh();
    if (reset) {
      this.sigma.startForceAtlas2();

      setTimeout(function() {
        this.sigma.stopForceAtlas2();
      }.bind(this), 1000)
    }

    var dragListener = new sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
    dragListener.bind('drop', function(event) {
      ClientActions.saveNodePosition(event.data.node);
    });
  },

  render: function() {

    return (
      <div id="graph">

      </div>
    );
  },

  _deleteWorkflowResponse: function (workflowResponse) {
    if (window.confirm("Do you really want to delete this workflow item AND all children items?")) {
      ClientActions.deleteWorkflowResponse(workflowResponse);
    }
  }
});

module.exports = Graph;
