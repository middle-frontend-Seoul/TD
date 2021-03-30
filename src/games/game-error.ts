export class GameError extends Error {
  private error?: Error;

  constructor(message: string, error?: Error) {
    super(message);

    if (error && !(error instanceof Error)) {
      throw new Error(`${error} Не является экземпляром класса Error`);
    }

    this.name = 'GameError';
    this.error = error;
  }

  getError(): Error | undefined {
    return this.error;
  }

  toString(): string {
    return this.message;
  }
}
