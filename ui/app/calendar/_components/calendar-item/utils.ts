import { isInDate } from "@/lib/utils";
import { TopicItem } from "../calendar/static-data";

const isFlagStart = (data: TopicItem, date: Date): boolean => {
  const { startTime, endTime } = data;

  return (
    !!startTime &&
    !!endTime &&
    isInDate(date, startTime) &&
    !isBothStartAndFinish(data, date)
  );
};

const isFlagEnd = (data: TopicItem, date: Date): boolean => {
  const { startTime, endTime } = data;

  return (
    !!startTime &&
    !!endTime &&
    isInDate(date, endTime) &&
    !isBothStartAndFinish(data, date)
  );
};

const isBothStartAndFinish = (data: TopicItem, date: Date): boolean => {
  const { startTime, endTime } = data;

  return !!startTime && !!endTime && isInDate(startTime, endTime);
};

export { isFlagStart, isFlagEnd, isBothStartAndFinish };
