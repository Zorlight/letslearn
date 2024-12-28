import {
  CalendarDate,
  getLocalTimeZone,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
function zonedDateTimeToDate(zonedDateTime: ZonedDateTime): Date {
  const { year, month, day, hour, minute, second, millisecond } = zonedDateTime;
  return new Date(year, month - 1, day, hour, minute, second, millisecond);
}

function dateToZonedDateTime(date: Date): ZonedDateTime {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  //25200000 is the offset of the local time zone
  //25200000 in milliseconds means 7 hours -> Vietnam time zone is UTC+7
  //offset = 0 -> UTC time zone
  //offset = 25200000 -> UTC+7 time zone -> VIETNAM
  const offset = 25200000;
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();
  const timeZone = getLocalTimeZone();
  return new ZonedDateTime(
    year,
    month,
    day,
    timeZone,
    offset,
    hour,
    minute,
    second,
    millisecond
  );
}

const TimeValueToDate = (time: Time) => {
  const { hour, minute, second, millisecond } = time;
  return new Date(0, 0, 0, hour, minute, second, millisecond);
};

const DateToTimeValue = (date: Date) => {
  return new Time(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
};

const CalendarDateToDate = (calendarDate: CalendarDate) => {
  const { year, month, day } = calendarDate;
  return new Date(year, month - 1, day);
};

const DateToCalendarDate = (date: Date) => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
};

export {
  dateToZonedDateTime,
  zonedDateTimeToDate,
  TimeValueToDate,
  DateToTimeValue,
  CalendarDateToDate,
  DateToCalendarDate,
};
