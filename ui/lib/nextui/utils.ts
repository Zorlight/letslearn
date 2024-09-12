import { getLocalTimeZone, Time, ZonedDateTime } from "@internationalized/date";
function zonedDateTimeToDate(zonedDateTime: ZonedDateTime): Date {
  const { year, month, day, hour, minute, second, millisecond } = zonedDateTime;
  return new Date(year, month - 1, day, hour, minute, second, millisecond);
}

function dateToZonedDateTime(date: Date): ZonedDateTime {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const offset = date.getTimezoneOffset();
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

export {
  dateToZonedDateTime,
  zonedDateTimeToDate,
  TimeValueToDate,
  DateToTimeValue,
};
