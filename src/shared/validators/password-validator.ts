export default function passwordValidator(password: string) {
  const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regexp.test(password);
}
