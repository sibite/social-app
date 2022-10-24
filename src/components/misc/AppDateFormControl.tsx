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
  useDefaultValue?: boolean;
}

const AppDateFormControl: React.FC<Props> = ({
  dateControl,
  label,
  isRequired,
  useDefaultValue = true,
}) => (
  <FormControl isInvalid={dateControl.showInvalidity} isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <SimpleGrid columns={11} spacing={5} minChildWidth="14px">
      <GridItem colSpan={3}>
        <Select
          id="day"
          placeholder="DD"
          defaultValue={useDefaultValue ? dateControl.day.value : undefined}
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
      <GridItem colSpan={4}>
        <Select
          id="month"
          placeholder="MMMM"
          defaultValue={useDefaultValue ? dateControl.month.value : undefined}
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
      <GridItem colSpan={4}>
        <Select
          id="year"
          placeholder="YYYY"
          defaultValue={useDefaultValue ? dateControl.year.value : undefined}
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
