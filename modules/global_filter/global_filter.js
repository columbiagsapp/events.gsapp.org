
$(document).ready(function() {

  $('.global-filter select').change(function() {
    // Find parent form and auto-resubmit as soon as a new value is selected.
    for (var element = $(this).parent(); !element.is('form'); element = element.parent()) {}
    element.submit();
  });

  // View/Field radio buttons and corresponding drop-downs on global filter
  // block configuration form
  var viewSelectorDiv  = $('#global-filter-selector-view' ).parent();
  var fieldSelectorDiv = $('#global-filter-selector-field').parent();
  if ($('fieldset#edit-global-filter input[type="radio"]:checked').val() < 1) {
    viewSelectorDiv.hide();
  }
  else {
    fieldSelectorDiv.hide();
  }
  $('fieldset#edit-global-filter input[type="radio"]').change(function() {
    if ($(this).val() < 1) {
      viewSelectorDiv.hide();
      fieldSelectorDiv.show();
    }
    else {
      viewSelectorDiv.show();
      fieldSelectorDiv.hide();
    }
  });

});
