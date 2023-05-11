"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const ImageController_1 = require("../../../controllers/v1/ImageController");
const Authentication_1 = require("../../../helpers/Authentication");
exports.router = express_1.default.Router();
const controller = new ImageController_1.ImageController();
const auth = new Authentication_1.Authentication();
exports.router.get('/', auth.attachUserPayload, (req, res, next) => controller.getAll(req, res, next));
exports.router.post('/', (req, res, next) => controller.post(req, res, next));
exports.router.delete('/:id', auth.authenticateAdmin, (req, res, next) => controller.delete(req, res, next));
exports.router.post('/:id/accept', auth.authenticateAdmin, (req, res, next) => controller.accept(req, res, next));
//# sourceMappingURL=imageRouter.js.map