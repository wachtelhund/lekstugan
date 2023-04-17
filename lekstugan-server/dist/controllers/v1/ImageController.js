"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
/**
 * ImageController
 */
class ImageController {
    /**
     * Get all images
     *
     * @param {Request} _req - Request
     * @param {Request} res - Response
     * @param {NextFunction} _next - NextFunction
     */
    getAll(_req, res, _next) {
        res.send('ImageController.index');
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=ImageController.js.map