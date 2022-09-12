import { DateInputOptions } from '../../hooks/useDateInput';
import useInputControl, { InputOptions } from '../../hooks/useInputControl';
import createBirthDateValidator from '../../shared/validators/birth-date-validator';
import emailValidator from '../../shared/validators/email-validator';
import passwordValidator from '../../shared/validators/password-validator';

export const firstNameOptions: InputOptions = {
  initialValue: '',
  validator: (x) => x.length > 1,
  errorMessage: 'First name must be at least 2 letters long',
};

export const lastNameOptions: InputOptions = {
  initialValue: '',
  validator: (x) => x.length > 1,
  errorMessage: 'Last name must be at least 2 letters long',
};

export const emailOptions: InputOptions = {
  initialValue: '',
  validator: emailValidator,
  errorMessage: 'Invalid format of e-mail',
};

export const dateOfBirthOptions: DateInputOptions = {
  validator: createBirthDateValidator(13),
  errorMessage: 'You must be at least 13 years old in order to use our service',
};

export const passwordOptions: InputOptions = {
  initialValue: '',
  validator: passwordValidator,
  errorMessage:
    'Password must be at least 8 characters long containing lowercase letter, uppercase letter and number',
};

export const repeatPasswordOptions = (
  orgPassword: ReturnType<typeof useInputControl>
): InputOptions => ({
  initialValue: '',
  validator: (x) => orgPassword.isInvalid || x === orgPassword.value,
  errorMessage: 'Passwords do not match',
});
