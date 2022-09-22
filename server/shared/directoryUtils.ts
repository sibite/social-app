import { existsSync, mkdirSync } from 'fs';

export default function ensureDirExists(dirPath: string) {
  const dirExists = existsSync(dirPath);
  if (!dirExists) {
    mkdirSync(dirPath, { recursive: true });
  }
}
