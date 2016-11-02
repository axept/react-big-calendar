'use strict';

exports.__esModule = true;
exports.formats = undefined;

exports.default = function (globalize) {

  function getCulture(culture) {
    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture);
    return culture && culture.calendar.firstDay || 0;
  }

  (0, _formats.set)(formats);

  return (0, _localizer.set)({
    firstOfWeek: firstOfWeek,

    parse: function parse(value, format, culture) {
      return globalize.parseDate(value, format, culture);
    },
    format: function format(value, _format, culture) {
      return globalize.format(value, _format, culture);
    }
  });
};

var _formats = require('../formats');

var _localizer = require('../localizer');

// import dates from '../utils/dates';
var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 't', culture) + ' — ' + local.format(end, 't', culture);
};

// let weekRangeFormat = ({ start, end }, culture, local)=>
//   local.format(start, 'MMMM dd', culture) +
//     ' - ' + local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)

var formats = exports.formats = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'Y',
  dayHeaderFormat: 'MMMM dd, yyyy',
  dayRangeHeaderFormat: 'Y',
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat
};