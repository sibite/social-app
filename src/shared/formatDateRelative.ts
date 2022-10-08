import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import dateFormatter, { DateFormatterFormats } from './formatDate';

dayjs.extend(relativeTime);

const formats: DateFormatterFormats = {
  today: (date) => date.fromNow(),
  yesterday: (date) => date.format('[Yesterday at] HH:mm'),
  thisWeek: (date) => date.format('dddd[,] HH:mm'),
  thisYear: (date) => date.format('DD MMMM[,] HH:mm'),
  anytime: (date) => date.format('DD MMMM YYYY[,] HH:mm'),
};

const formatDateRelative = (date: Dayjs): string =>
  dateFormatter(date, formats);

export default formatDateRelative;
