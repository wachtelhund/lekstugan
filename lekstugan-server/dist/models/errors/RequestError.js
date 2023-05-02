"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
/**
 * Error class for errors that are caused by the client.
 *
 */
class RequestError extends Error {
    /**
     * Creates a new RequestError.
     *
     * @param {string} message The error message.
     * @param {number} status The HTTP status code.
     */
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=RequestError.js.map