import { API_URL } from '../env';

export default function getSrcUrl(path: string) {
  return `${API_URL}/${path}`;
}
