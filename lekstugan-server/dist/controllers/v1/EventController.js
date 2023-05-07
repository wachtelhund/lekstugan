"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const Event_1 = __importDefault(require("../../models/mongo/Event"));
const RequestError_1 = require("../../models/errors/RequestError");
/**
 * EventController
 */
class EventController {
    /**
     * Get all events
     *
     * @param {Request} _req - Request
     * @param {Response<IEventData[]>} res - Response
     * @param {NextFunction} _next - NextFunction
     */
    async getAll(_req, res, _next) {
        const events = await Event_1.default.find({});
        res.json(events);
    }
    /**
     * Create a new event
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async post(req, res, next) {
        try {
            const { title, description, date, image, link } = req.body;
            const event = new Event_1.default({
                title,
                description,
                date,
                image,
                link,
            });
            await event.save();
            res.json(event.id);
        }
        catch (error) {
            next(new RequestError_1.RequestError('Could not post event', 400));
        }
    }
    /**
     * Delete an event
     *
     * @param {Request} req - Request
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Event_1.default.findByIdAndDelete(id);
            res.json({ message: 'Event deleted' });
        }
        catch (error) {
            next(new RequestError_1.RequestError('Could not delete event', 400));
        }
    }
}
exports.EventController = EventController;
//# sourceMappingURL=EventController.js.map