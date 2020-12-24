export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const __DEV__: boolean;
  const BASE_URL: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      BUILD_ENV: 'local' | 'prod';
      BASE_URL: string;
    }
  }
}
