import { FrontendError } from './front-error';
import { ServerError } from './server-error';

export interface ILogger {
  server(_message: string): ServerError;
  frontend(_message: string): FrontendError;
}
