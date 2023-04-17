"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = require("./v1/router");
const RequestError_1 = require("../../models/errors/RequestError");
exports.router = express_1.default.Router();
exports.router.use('/api/v1', router_1.router);
exports.router.use('*', (_req, _res, next) => {
    next(new RequestError_1.RequestError('Not Found', 404));
});
//# sourceMappingURL=router.js.map