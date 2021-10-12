import { createLogger } from './factory-functions';

const logger = createLogger();

logger.debug('Debug message');
logger.warn('Warn message');
logger.info('Info message');
logger.error('Error message');
