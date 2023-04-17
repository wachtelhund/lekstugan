"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const imageRouter_1 = require("./imageRouter");
exports.router = express_1.default.Router();
exports.router.get('/', (_req, res) => res.send('API v1'));
exports.router.use('/images', imageRouter_1.router);
// router.use('/events', eventsRouter);
// router.use('/bookings', bookingsRouter);
//# sourceMappingURL=router.js.map