import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formatDate = (date: Dayjs): string => {
  const format = {
    today: date.fromNow(),
    yesterday: date.format('[Yesterday at] HH:mm'),
    thisWeek: date.format('dddd[,] HH:mm'),
    thisYear: date.format('DD MMMM[,] HH:mm'),
    anytime: date.format('DD MMMM YYYY[,] HH:mm'),
  };
  const diff = dayjs().diff(date, 'hours');
  const isYesterday = date.isSameOrAfter(
    dayjs().subtract(1, 'day').startOf('day')
  );
  const isThisWeek = date.isSameOrAfter(
    dayjs().subtract(6, 'day').startOf('day')
  );
  const isThisYear = date.isSameOrAfter(dayjs().startOf('year'));
  let dateFormatted;
  if (diff < 22) dateFormatted = format.today;
  else if (isYesterday) dateFormatted = format.yesterday;
  else if (isThisWeek) dateFormatted = format.thisWeek;
  else if (isThisYear) dateFormatted = format.thisYear;
  else dateFormatted = format.anytime;

  return dateFormatted;
};

export default formatDate;
