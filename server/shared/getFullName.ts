import { UserType } from '../api-types/auth';

export default function getFullName(profile: {
  [key: string]: any;
  name: string;
  lastName: string;
}) {
  if (!profile) return '';
  return `${profile.name} ${profile.lastName}`;
}
