import defaultConfig from './config.default';
import ConfigType from './config.type';
import CONSTS, { ConstsType } from './consts';

const targetConfig = (() => {
  const filePath =
    process.env.MODE === 'production' ? './config.prod' : './config.dev';
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(filePath)?.default;
  } catch (error) {
    return {};
  }
})();

const keys: (keyof ConfigType)[] = [
  'ACCESS_TOKEN_SECRET',
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

const config: ConfigType & ConstsType = {
  ...CONSTS,
  ...defaultConfig,
  ...targetConfig,
  ...envConfig,
};

export default { ...config };
