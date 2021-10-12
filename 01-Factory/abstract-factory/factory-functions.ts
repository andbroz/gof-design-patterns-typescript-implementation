interface ILogger {
  info(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

const productionLogger = (): ILogger => ({
  info(message: string): void {},
  warn(message: string): void {
    console.warn(message);
  },
  debug(message: string): void {},
  error(message: string): void {
    console.error(message);
  },
});

const developmentLogger = (): ILogger => ({
  info(message: string): void {
    console.info(message);
  },
  warn(message: string): void {
    console.warn(message);
  },
  debug(message: string): void {
    console.debug(message);
  },
  error(message: string): void {
    console.error(message);
  },
});

export const createLogger = (): ILogger => {
  if (process.env.NODE_ENV === 'production') {
    return productionLogger();
  } else {
    return developmentLogger();
  }
};
