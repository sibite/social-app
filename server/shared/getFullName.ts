import { UserType } from '../api-types/auth';

export default function getFullName(profile: UserType) {
  return `${profile.name} ${profile.lastName}`;
}
