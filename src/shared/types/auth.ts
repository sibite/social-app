export interface SignUpBodyType {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: number;
}

export interface LogInBodyType {
  email: string;
  password: string;
}
