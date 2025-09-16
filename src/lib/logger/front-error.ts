export class FrontendError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'FrontendError';
  }
}
