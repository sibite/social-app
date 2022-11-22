import ConfigType from './config.type';

const defaultConfig: ConfigType = {
  ACCESS_TOKEN_SECRET: 'private_key', // for authentication
  FILE_SIZE_LIMIT: 20 * 1024 * 1024, // for file uploads like avatar
  JPEG_QUALITY: 90, // for image compression
  API_URL: '/api', // for generating urls to files for front-end
  PORT: 4000,
};

export default defaultConfig;
