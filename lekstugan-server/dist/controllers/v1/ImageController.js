"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const Image_1 = __importDefault(require("../../models/mongo/Image"));
const RequestError_1 = require("../../models/errors/RequestError");
/**
 * ImageController
 */
class ImageController {
    /**
     * Get all images
     *
     * @param {Request} req - Request
     * @param {Response<IBase64Image[]>} res - Response
     * @param {NextFunction} _next - NextFunction
     */
    async getAll(req, res, _next) {
        const limit = parseInt(req.query.limit) || undefined;
        const offset = parseInt(req.query.offset) || undefined;
        // const query = Image.find({});
        const pending = req.query.pending === 'true';
        const query = Image_1.default.find({ pending: pending });
        if (limit !== undefined) {
            query.limit(limit);
            console.log(limit);
        }
        if (offset !== undefined) {
            query.skip(offset);
            console.log(offset);
        }
        const images = await query.exec();
        res.json(images);
    }
    /**
     * Post a new image
     *
     * @param {Request<IBase64Image>} req - Request
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async post(req, res, next) {
        try {
            // TODO: Validate image data using Sharp
            const { base64, width, height } = req.body;
            const image = new Image_1.default({
                base64,
                width,
                height,
                pending: true,
            });
            await image.save();
            res.json(image.id);
        }
        catch (error) {
            next(new RequestError_1.RequestError('Could not post image', 404));
        }
    }
    /**
     * Delete an image
     *
     * @param {Request} req - Request
     * @param {Request} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Image_1.default.findByIdAndDelete(id);
            res.json({ message: 'Image deleted' });
        }
        catch (error) {
            next(new RequestError_1.RequestError('Image not found', 404));
        }
    }
    /**
     * Accept an image.
     * @param {Request<IBase64Image>} req - Request
     * @param {Response<IBase64Image>} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async accept(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);
            const image = await Image_1.default.findById(id);
            if (image) {
                image.pending = false;
                await image.save();
                res.json(image);
            }
        }
        catch (error) {
            next(new RequestError_1.RequestError('Image not found', 404));
        }
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=ImageController.js.map