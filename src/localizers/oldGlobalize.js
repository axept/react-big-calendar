// import dates from '../utils/dates';
import { set } from '../formats';
import { set as setLocalizer } from '../localizer';

let dateRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture)

let timeRangeFormat = ({ start, end }, culture, local)=>
  local.format(start, 't', culture) +
    ' — ' + local.format(end, 't', culture)

// let weekRangeFormat = ({ start, end }, culture, local)=>
//   local.format(start, 'MMMM dd', culture) +
//     ' - ' + local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)

export let formats = {
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
}

export default function(globalize) {

  function getCulture(culture){
    return culture
      ? globalize.findClosestCulture(culture)
      : globalize.culture()
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture)
    return (culture && culture.calendar.firstDay) || 0
  }

  set(formats)

  return setLocalizer({
    firstOfWeek,

    parse(value, format, culture){
      return globalize.parseDate(value, format, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
    }
  })
}
