/**
 * Add the following features to the date combo widget
 *   Update the "to" field when changing the "from" field to maintain duration
 *   Add a dropdown timepicker
 *   Add an "All Day" button
 */
Drupal.dateTweaks = {
    duration : [],
    restore : []
};

/**
 * When document loads, process the date field and set event handlers
 */
$(document).ready(function() { 
  // Process evey combo
  $('.datetweaks-datecombo').each(function(){
    var combo = $(this);
    
    // When the "from" field changes, automatically adjust the "to" field
    combo.find('.datetweaks-value input').change(function(){
      Drupal.dateTweaks.setTo(combo);

      // When the timpicker changes the "from" field, automatically adjust the "to" field
    }).bind('time-change', function(){
      Drupal.dateTweaks.setTo(combo);
    });

    // When the "to" field changes, calculate the duration
    combo.find('.datetweaks-value2 input').change(function(){
      Drupal.dateTweaks.setDuration(combo);

    // When the timpicker changes the "to" field, calculate the duration
    }).bind('time-change', function(){
      Drupal.dateTweaks.setDuration(combo);
    });
    
    // Set the initial duration
    Drupal.dateTweaks.setDuration(combo);
    
    // When All Day checkbox changes, process all day
    var allDay = combo.find('.datetweaks-all-day');
    allDay.click(function(){
      Drupal.dateTweaks.setAllDay(combo);
    });

    // If All Day, disable the time values
    if (allDay.attr('checked')) {
      Drupal.dateTweaks.setAllDay(combo);
    }
  });
  
  // If set, change every "time" field to a dropdown timepicker
  if (Drupal.settings.datetweaks.use_dropdown == true) {
    $('.datetweaks-time').each(function() {
      var timeField = $(this);
      var date = Date.parseDate(timeField.val(), timeField.attr('format'));
      
      // Convert to compatible format for timepicker
      var timeFormat = timeField.attr('format').replace('i', 'mm').replace('A', 'p');
      timeField.timepicker({timeFormat: timeFormat, interval : 15, startTime : date});
    });
  }
});


/**
 * Set the "to" field
 */
Drupal.dateTweaks.setTo = function (combo) {
  var id = combo.attr('id');
  var duration = this.duration[id];
  if (duration == null) {
    this.setDuration(combo);
  } else {
    var start = this.getDateValue(combo.find('.datetweaks-value'));
    var end = start.getTime() + duration;
    end = new Date(end);
    dateField2 = combo.find('.datetweaks-value2 .datetweaks-date');
    dateField2.val(end.dateFormat(dateField2.attr('format')));
    timeField2 = combo.find('.datetweaks-value2 .datetweaks-time');
    timeField2.val(end.dateFormat(timeField2.attr('format')));
    this.setTimepicker(timeField2, end);
  }
};

/**
 * Calculate the duration
 */
Drupal.dateTweaks.setDuration = function (combo) {
  try {
    var id = combo.attr('id');
    var start = this.getDateValue(combo.find('.datetweaks-value'));
    var end = this.getDateValue(combo.find('.datetweaks-value2'));
    this.duration[id] = end.getTime() - start.getTime();
  }catch(e){
    this.duration[id] = null;
  }
};

/**
 * Check the state of the "All Day" checkbox - if on, disable the time fields; otherwise,
 * restore previously set times
 */
Drupal.dateTweaks.setAllDay = function (combo) {
  var id = combo.attr('id');
  var allDay = combo.find('.datetweaks-all-day');
  var dateField1 = combo.find('.datetweaks-value .datetweaks-date');
  var dateField2 = combo.find('.datetweaks-value2 .datetweaks-date');
  var timeField1 = combo.find('.datetweaks-value .datetweaks-time');
  var timeField2 = combo.find('.datetweaks-value2 .datetweaks-time');
  
  if (allDay.attr('checked')) {
    this.restore[id] = {
      date1 : dateField1.val(), 
      time1 : timeField1.val(), 
      date2 : dateField2.val(), 
      time2 : timeField2.val()
    };
    var format = dateField1.attr('format') + ' h:i';
    var date = Date.parseDate(dateField1.val() + ' 00:00', format);
    if (date != null) {
      timeField1.val(date.dateFormat(timeField1.attr('format')));
      timeField2.val(date.dateFormat(timeField2.attr('format')));
    }
    timeField1.attr('disabled', 'disabled');
    timeField2.attr('disabled', 'disabled');
    var hidden = $('<input type="hidden" class="datetweaks-all-day-time"/>').attr('name',timeField1.attr('name')).val(timeField1.val());
    combo.append(hidden);
    hidden = $('<input type="hidden" class="datetweaks-all-day-time"/>').attr('name',timeField2.attr('name')).val(timeField2.val());
    combo.append(hidden);
  }
  else{
    var restore = this.restore[id];
    if (restore == null || restore.time1 == null || restore.time2 == null || restore.time1 == restore.time2) {
      var start = new Date();
      var minutes = start.getMinutes();
      minutes = Math.round(minutes / 60 * 4) * 15; // 15 minute increments
      start.setMinutes(minutes, 0, 0);
      dateField1.val(start.dateFormat(dateField1.attr('format')));
      timeField1.val(start.dateFormat(timeField1.attr('format'))).attr('disabled', '');
      this.setTimepicker(timeField1, start);
      this.duration[id] = 60 * 60 * 1000;  // 1 hour duration
    }
    else  if (restore != null) {
      dateField1.val(restore.date1);
      timeField1.val(restore.time1).attr('disabled', '');
    }
    timeField2.attr('disabled', '');
    this.setTo(combo);
    combo.find('.datetweaks-all-day-time').remove();
  }
};

/**
 * Set the timepicker dropdown to the current value in the time field
 */
Drupal.dateTweaks.setTimepicker = function (timeField, time) {
  if (Drupal.settings.datetweaks.use_dropdown == true) {
    // Set the timepicker to the new time.
    // The time picker normalize off an arbitary date - kinda wierd
    date = new Date(1988, 7, 24, time.getHours(), time.getMinutes(), 00);
    var timePicker = timeField.data('TimePicker');
    if (timePicker != null) {
      timePicker.setTime(date);
    }
  }
};

/**
 * Parse date and time into a Date Object
 */
Drupal.dateTweaks.getDateValue = function(value) {
  var dateField = value.find('.datetweaks-date');
  var dateVal = dateField.val();
  var timeField = value.find('.datetweaks-time');
  var timeVal = timeField.val();
  var dateStr = dateVal + ' ' + timeVal;
  var format = dateField.attr('format') + ' ' + timeField.attr('format');
  return Date.parseDate(dateStr, format);
};

