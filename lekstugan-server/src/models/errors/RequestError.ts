/**
 * Error class for errors that are caused by the client.
 *
 */
export class RequestError extends Error {
  status: number;
  /**
   * Creates a new RequestError.
   *
   * @param {string} message The error message.
   * @param {number} status The HTTP status code.
   */
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
