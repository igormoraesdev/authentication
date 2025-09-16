import { FrontendError, ILogger, ServerError } from './';

class Logger implements ILogger {
  private static instance: ILogger | null = null;

  constructor() {
    this.server = this.server.bind(this);
    this.frontend = this.frontend.bind(this);
  }

  public server(message: string) {
    return new ServerError(message);
  }
  public frontend(message: string) {
    return new FrontendError(message);
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}

export const logger = Logger.getInstance();
