const env = process.env.NODE_ENV || 'development';

type EnvConfig = {
  secrets?: any;
};
let envConfig: EnvConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config;
    break;
  case 'test':
  case 'testing':
    envConfig = require('./test').config;
    break;
  default:
    envConfig = require('./dev').config;
}

export default envConfig;
