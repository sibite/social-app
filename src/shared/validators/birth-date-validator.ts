import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function createBirthDateValidator(minAge: number) {
  return (date: Dayjs) => {
    const minDate = dayjs(new Date(1800, 0, 1));
    const maxDate = dayjs().subtract(minAge, 'years');

    return date.isSameOrAfter(minDate) && date.isSameOrBefore(maxDate);
  };
}
