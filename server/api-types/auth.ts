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
  _id: string;
  fullName: string;
  name: string;
  lastName: string;
  email: string;
  avatarSrc?: string;
  birthDate?: number;
  description?: string;
}

export type UserPublicType = Partial<UserType>;
