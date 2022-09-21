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

export interface UserType {
  name: string;
  lastName: string;
  email: string;
  avatarSrc?: string;
  birthDate?: string;
}
