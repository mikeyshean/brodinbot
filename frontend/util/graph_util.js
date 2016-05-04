var GraphUtil = {
  findTrigger: function (nodes, workflow_response_id) {
    var node, result;

    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];

      if (node.workflow_response_id === workflow_response_id
        && node.group === "Trigger") {
          result = node;
          break;
      }
    }

    return result;
  },

  findActionable: function (nodes, workflow_response_id) {
    var node, result;

    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];

      if (node.workflow_response_id === workflow_response_id
        && node.group !== "Trigger") {
          result = node;
          break;
      }
    }

    return result;
  }
}

module.exports = GraphUtil;
