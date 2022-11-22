import defaultConfig from './config.default';
import ConfigType from './config.type';

const productionConfig = (() => {
  try {
    // eslint-disable-next-line global-require
    return require('./config.prod')?.default;
  } catch (error) {
    return {};
  }
})();

const keys: (keyof ConfigType)[] = [
  'ACCESS_TOKEN_SECRET',
  'API_URL',
  'FILE_SIZE_LIMIT',
  'JPEG_QUALITY',
  'PORT',
];

const envConfig = (() => {
  const partialConfig: any = {};
  keys.forEach((key) => {
    if (process.env[key] !== undefined) {
      partialConfig[key] = process.env[key];
    }
  });
  return partialConfig;
})();

const config: ConfigType = {
  ...defaultConfig,
  ...productionConfig,
  ...envConfig,
};

export default { ...config };
