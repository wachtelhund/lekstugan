"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const BookingController_1 = require("../../../controllers/v1/BookingController");
const Authentication_1 = require("../../../helpers/Authentication");
exports.router = express_1.default.Router();
const controller = new BookingController_1.BookingController();
const auth = new Authentication_1.Authentication();
// @ts-ignore
const authenticateAsscoiation = 
// @ts-ignore
(req, res, next) => {
    //check if user is has auth key
    next();
};
exports.router.get('/', auth.authenticateAdmin, (req, res, next) => controller.getAll(req, res, next));
exports.router.post('/', authenticateAsscoiation, (req, res, next) => controller.post(req, res, next));
exports.router.delete('/:id', auth.authenticateAdmin, (req, res, next) => controller.delete(req, res, next));
exports.router.post('/:id/accept', auth.authenticateAdmin, (req, res, next) => controller.accept(req, res, next));
//# sourceMappingURL=bookingRouter.js.map