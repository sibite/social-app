import type { ServerToClientMessage } from '../chat-socket/socket-types';

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

export interface ContactType {
  userId: string;
  lastMessage: ServerToClientMessage;
}

export interface UserDBType {
  _id?: string;
  passwordHash: string;
  salt: string;
  name: string;
  lastName: string;
  email: string;
  following?: string[];
  contacts?: { [userId: string]: ContactType };
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
  contacts?: { [userId: string]: ContactType };
  avatarSrc?: string;
  coverSrc?: string;
  birthDate?: number;
  description?: string;
}

export interface UserPublicType extends Partial<UserType> {
  isFollowed: boolean;
}
