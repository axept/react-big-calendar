'use strict';

exports.__esModule = true;
exports.formats = undefined;

exports.default = function (globalize) {
  var locale = function locale(culture) {
    return culture ? globalize(culture) : globalize;
  };

  // return the first day of the week from the locale data. Defaults to 'world'
  // territory if no territory is derivable from CLDR.
  // Failing to use CLDR supplemental (not loaded?), revert to the original
  // method of getting first day of week.
  function firstOfWeek(culture) {
    try {
      var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      var cldr = locale(culture).cldr;
      var territory = cldr.attributes.territory;
      var weekData = cldr.get('supplemental').weekData;
      var firstDay = weekData.firstDay[territory || '001'];
      return days.indexOf(firstDay);
    } catch (e) {
      (0, _warning2.default)(true, 'Failed to accurately determine first day of the week.\n            Is supplemental data loaded into CLDR?');
      // maybe cldr supplemental is not loaded? revert to original method
      var date = new Date();
      //cldr-data doesn't seem to be zero based
      var localeDay = Math.max(parseInt(locale(culture).formatDate(date, { raw: 'e' }), 10) - 1, 0);

      return Math.abs(date.getDay() - localeDay);
    }
  }

  if (!globalize.load) return (0, _oldGlobalize2.default)(globalize);

  (0, _formats.set)(formats);

  return (0, _localizer.set)({
    firstOfWeek: firstOfWeek,

    parse: function parse(value, format, culture) {
      format = typeof format === 'string' ? { raw: format } : format;
      return locale(culture).parseDate(value, format);
    },
    format: function format(value, _format, culture) {
      _format = typeof _format === 'string' ? { raw: _format } : _format;
      return locale(culture).formatDate(value, _format);
    }
  });
};

var _oldGlobalize = require('./oldGlobalize');

var _oldGlobalize2 = _interopRequireDefault(_oldGlobalize);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _formats = require('../formats');

var _localizer = require('../localizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dates from '../utils/dates';
var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, { date: 'short' }, culture) + ' — ' + local.format(end, { date: 'short' }, culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, { time: 'short' }, culture) + ' — ' + local.format(end, { time: 'short' }, culture);
};

// let weekRangeFormat = ({ start, end }, culture, local) =>
//   local.format(start, 'MMMM dd', culture) +
//     ' — ' + local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)

var formats = exports.formats = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: { time: 'short' },

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'MMMM dd, yyyy',
  dayRangeHeaderFormat: 'MMMM yyyy',
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'eee MMM dd',
  agendaTimeFormat: { time: 'short' },
  agendaTimeRangeFormat: timeRangeFormat
};