import Chalklogger from 'Chalkmomentlogger';
const logger2 = new Chalklogger({
  logLevel: 'warn',
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  fileOutput: 'logs2.log',
  // storeConsoleLogs: true,
  priority: 102323,
  label: 'Example2',
});
const logger = new Chalklogger({
  logLevel: 'warn',
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  fileOutput: 'logs.log',
  storeConsoleLogs: true,
  priority: 11,
  label: 'Example',
});

logger.debug('This is a debug message.');
logger.info('This is an info message.');
logger.warn('This is a warning message.');
logger.error('This is an error message.');
logger2.error('This is an error message using second logger.');
logger2.warn('This is an error message using second logger2.');