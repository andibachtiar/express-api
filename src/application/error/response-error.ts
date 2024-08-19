export class ResponseError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  public getMessage(): string {
    return this.message;
  }
}
