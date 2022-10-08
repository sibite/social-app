import { Dayjs } from 'dayjs';
import dateFormatter, { DateFormatterFormats } from './formatDate';

const formats: DateFormatterFormats = {
  today: (date) => date.format('HH:mm'),
  yesterday: (date) => date.format('[Yesterday at] HH:mm'),
  thisWeek: (date) => date.format('dddd[,] HH:mm'),
  thisYear: (date) => date.format('DD MMMM[,] HH:mm'),
  anytime: (date) => date.format('DD MMMM YYYY[,] HH:mm'),
};

const formatDateInformative = (date: Dayjs): string =>
  dateFormatter(date, formats);

export default formatDateInformative;
