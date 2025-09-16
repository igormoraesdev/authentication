import * as Sentry from '@sentry/nextjs';
import { ILogger } from './';

class Logger implements ILogger {
  private static instance: Logger | null = null;

  constructor(private readonly _sentry: typeof Sentry) {}

  log(message: string, error?: Error | unknown) {
    this._sentry.captureMessage(message, {
      level: 'error',
      extra: {
        error,
      },
    });
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(Sentry);
    }
    return Logger.instance;
  }
}

export const logger = Logger.getInstance();
