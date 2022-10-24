import {
  FormControl,
  FormLabel,
  SimpleGrid,
  GridItem,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import useDateInput from '../../hooks/useDateInput';

interface Props {
  dateControl: ReturnType<typeof useDateInput>;
  label: string;
  isRequired?: React.ComponentProps<typeof FormControl>['isRequired'];
}

const AppDateFormControl: React.FC<Props> = ({
  dateControl,
  label,
  isRequired,
}) => (
  <FormControl isInvalid={dateControl.showInvalidity} isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <SimpleGrid columns={5} spacing={5} minChildWidth="70px">
      <GridItem colSpan={1}>
        <Select
          id="day"
          placeholder="DD"
          defaultValue={dateControl.day.value}
          onBlur={dateControl.day.touchHandler}
          onChange={dateControl.day.changeHandler}
        >
          {dateControl.day.options.map(([value, optLabel]) => (
            <option value={value} key={value}>
              {optLabel}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={2}>
        <Select
          id="month"
          placeholder="MMMM"
          defaultValue={dateControl.month.value}
          onBlur={dateControl.month.touchHandler}
          onChange={dateControl.month.changeHandler}
        >
          {dateControl.month.options.map(([value, optLabel]) => (
            <option value={value} key={value}>
              {optLabel}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={2}>
        <Select
          id="year"
          placeholder="YYYY"
          defaultValue={dateControl.year.value}
          onBlur={dateControl.year.touchHandler}
          onChange={dateControl.year.changeHandler}
        >
          {dateControl.year.options.map(([value, optLabel]) => (
            <option value={value} key={value}>
              {optLabel}
            </option>
          ))}
        </Select>
      </GridItem>
    </SimpleGrid>
    <FormErrorMessage>{dateControl.errorMessage}</FormErrorMessage>
  </FormControl>
);
export default AppDateFormControl;
