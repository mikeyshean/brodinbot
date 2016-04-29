var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');
var _application = {'navSelection': AppConstants.WORKFLOWS};
var ApplicationStore = new Store(AppDispatcher);

ApplicationStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AppConstants.NAV_SELECTED:
      _application['navSelection'] = payload.navSelection;
      ApplicationStore.__emitChange();
      break;

    case AppConstants.TREE_RECEIVED:
      _application['treeData'] = payload.tree;
      ApplicationStore.__emitChange();
      break;

    case AppConstants.WORKFLOW_RESPONSE_RECEIVED:
      ApplicationStore.insertNode(payload.workflowResponse);
      ApplicationStore.__emitChange();
  }
}


ApplicationStore.insertNode = function (node) {
  parentNode = ApplicationStore._findById(node['parent_id']);

  if (parentNode) {
    parentNode['children'].push(node);
  } else {
    _application['treeData'] = node;
  }
}

ApplicationStore._findById = function (id) {
  var queue = [_application['treeData']];
  var result;

  while (queue.length > 0) {
    var node = queue.shift();

    if (node.id === id) {
      result = node;
      break;
    }
    queue = queue.concat(node.children);
  }

  return result;
}

ApplicationStore.state = function () {
  return Object.assign({}, _application);
};

module.exports = ApplicationStore
