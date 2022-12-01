import { Dayjs } from 'dayjs';
import { useState } from 'react';
import getDayjsInstance from '../shared/getDayjsInstance';

const dayjs = getDayjsInstance();

const enLocaleData = dayjs().locale('en').localeData();

export interface DateInputOptions {
  initialValue?: Dayjs;
  validator?: (value: Dayjs) => boolean;
  errorMessage?: string;
}

function useDateInput({
  initialValue = dayjs(),
  validator = () => true,
  errorMessage = '',
}: DateInputOptions) {
  const [date, setDate] = useState(initialValue);
  const [isDayTouched, setIsDayTouched] = useState(false);
  const [isMonthTouched, setIsMonthTouched] = useState(false);
  const [isYearTouched, setIsYearTouched] = useState(false);

  const daysInMonth = date.daysInMonth();

  const touchHandler = () => {
    setIsDayTouched(true);
    setIsMonthTouched(true);
    setIsYearTouched(true);
  };

  const dayChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = +event.currentTarget.value;
    if (newDay > daysInMonth) return;
    setDate((oldDate) => oldDate.date(newDay));
  };
  const monthChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = +event.currentTarget.value - 1;
    setDate((oldDate) => oldDate.month(newMonth));
  };
  const yearChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = +event.currentTarget.value;
    setDate((oldDate) => oldDate.year(newYear));
  };

  const day = date.get('date');
  const month = date.get('month') + 1;
  const year = date.get('year');

  const isTouched = isDayTouched && isMonthTouched && isYearTouched;
  const isInvalid = !validator(date);
  const showInvalidity = isInvalid && isTouched;

  const dayOptions = Array(daysInMonth)
    .fill(0)
    .map((_value, index) => [index + 1, index + 1]);
  const monthOptions = enLocaleData
    .months()
    .map((monthName, index) => [index, monthName]);
  const startYear = dayjs().get('year') - 149;
  const yearOptions = Array(150)
    .fill(0)
    .map((_value, index) => [startYear + index, startYear + index]);

  return {
    value: date,
    isInvalid,
    isTouched,
    showInvalidity,
    errorMessage,
    daysInMonth,
    touchHandler,
    day: {
      touchHandler: () => setIsDayTouched(true),
      changeHandler: dayChangeHandler,
      value: day,
      options: dayOptions,
    },
    month: {
      touchHandler: () => setIsMonthTouched(true),
      changeHandler: monthChangeHandler,
      value: month,
      options: monthOptions,
    },
    year: {
      touchHandler: () => setIsYearTouched(true),
      changeHandler: yearChangeHandler,
      value: year,
      options: yearOptions,
    },
  };
}

export default useDateInput;
