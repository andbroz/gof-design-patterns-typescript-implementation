import { LoggerFactory } from './factory-class';

const logger = LoggerFactory.createLogger();

logger.debug('Debug message');
logger.warn('Warn message');
logger.info('Info message');
logger.error('Error message');
