import config from '../config/config';

export default function getSrcUrl(path: string) {
  return `${config.API_URL}/${path}`;
}
