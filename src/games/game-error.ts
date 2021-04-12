export class GameError extends Error {
  private error?: Error | string;

  constructor(message: string, error?: Error | string) {
    super(message);

    if (error && typeof error !== 'string' && !(error instanceof Error)) {
      throw new Error(`${error} Не является экземпляром класса Error`);
    }

    this.name = 'GameError';

    this.error = error;
  }

  getError(): Error | string | undefined {
    return this.error;
  }

  toString(): string {
    return this.message;
  }
}
