export default interface ConfigType {
  ACCESS_TOKEN_SECRET: string; // for authentication
  FILE_SIZE_LIMIT: number; // for file uploads like avatar
  JPEG_QUALITY: number; // for image compression
  API_URL: string; // for generating urls to files for front-end
  PORT: number;
}
