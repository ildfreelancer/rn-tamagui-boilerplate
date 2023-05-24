import {
  logger,
  consoleTransport,
  transportFunctionType,
} from 'react-native-logs';

const productionTransport: transportFunctionType = _props => {
  // only log to sentry if severity is error
};

const config = {
  severity: __DEV__ ? 'debug' : 'error',
  transport: __DEV__ ? consoleTransport : productionTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
};

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export const LOG = logger.createLogger(config);
export const setLogLevel = (logLevel: LogLevel) => {
  if (__DEV__) {
    return;
  }

  if (['debug', 'info', 'warn', 'error'].includes(logLevel)) {
    LOG.setSeverity(logLevel);
  }
};
