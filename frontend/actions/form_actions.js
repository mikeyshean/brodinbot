var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/app_constants');

FormActions = {
  clearFormErrors: function () {
    AppDispatcher.dispatch({
      actionType: AppConstants.FORM_ERRORS_CLEARED
    });
  },
}

module.exports = FormActions;
