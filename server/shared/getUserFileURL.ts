import { existsSync } from 'fs';
import path from 'path';
import getSrcUrl from './getSrcUrl';

export default function getUserFileURL(src?: string) {
  return src &&
    existsSync(path.join(__dirname, `../../database/uploads/${src}`))
    ? getSrcUrl(src)
    : undefined;
}
