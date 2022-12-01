import { Dayjs } from 'dayjs';
import dateFormatter, { DateFormatterFormats } from './formatDate';

const formats: DateFormatterFormats = {
  today: (date) => date.fromNow(true),
  yesterday: (date) => date.fromNow(true),
  thisWeek: (date) => date.fromNow(true),
  thisYear: (date) => date.fromNow(true),
  anytime: (date) => date.fromNow(true),
};

const formatDateRelativeShort = (date: Dayjs): string =>
  dateFormatter(date, formats);

export default formatDateRelativeShort;
