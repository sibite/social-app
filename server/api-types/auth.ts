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

export interface UserDBType {
  _id: string;
  passwordHash: string;
  salt: string;
  name: string;
  lastName: string;
  email: string;
  following?: string[];
  contacts?: string[];
  avatarSrc?: string;
  coverSrc?: string;
  birthDate?: number;
  description?: string;
}

export interface UserType {
  _id: string;
  fullName: string;
  name: string;
  lastName: string;
  email: string;
  following?: string[];
  contacts?: string[];
  avatarSrc?: string;
  coverSrc?: string;
  birthDate?: number;
  description?: string;
}

export interface UserPublicType extends Partial<UserType> {
  isFollowed: boolean;
}
