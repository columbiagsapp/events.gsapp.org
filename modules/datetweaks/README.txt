This module extends the Date module to provide enhanced UI functionality. 
Specifically, this module does the following:

* Adds in Baron Schwartz's date-time javascript functionality
* Maintains the date's duration - so when the start date changes, the
end date also changes
* Adds in Willington Vega's dropdown time picker.  By default, this
timepicker replaces the standard timepicker
* Adds an "All Day" button which toggles the time field.  When checked,
the start and end time is set to 00:00

Known issues

This module only supports the date_combo - "Text field with Date Pop-up". 
If the date field is using a different Widget Type, this module effectively does nothing.

The date-functions.js isn't internationalized, that means that any date 
format using a month name or abbreviation won't work for non-English. A simple workaround 
is to use a format like YYYY-mm-dd. If someone wants to work on an internationalized version, 
they should contact the author. 