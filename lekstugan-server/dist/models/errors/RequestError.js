"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
class RequestError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=RequestError.js.map