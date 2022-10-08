import dayjs, { Dayjs } from 'dayjs';

type DateFormatterFunction = (date: Dayjs) => string;

export interface DateFormatterFormats {
  today: DateFormatterFunction;
  yesterday: DateFormatterFunction;
  thisWeek: DateFormatterFunction;
  thisYear: DateFormatterFunction;
  anytime: DateFormatterFunction;
}

const dateFormatter = (date: Dayjs, formats: DateFormatterFormats): string => {
  const diff = dayjs().diff(date, 'hours');
  const isYesterday = date.isSameOrAfter(
    dayjs().subtract(1, 'day').startOf('day')
  );
  const isThisWeek = date.isSameOrAfter(
    dayjs().subtract(6, 'day').startOf('day')
  );
  const isThisYear = date.isSameOrAfter(dayjs().startOf('year'));
  let dateFormatted;
  if (diff < 22) dateFormatted = formats.today(date);
  else if (isYesterday) dateFormatted = formats.yesterday(date);
  else if (isThisWeek) dateFormatted = formats.thisWeek(date);
  else if (isThisYear) dateFormatted = formats.thisYear(date);
  else dateFormatted = formats.anytime(date);

  return dateFormatted;
};

export default dateFormatter;
