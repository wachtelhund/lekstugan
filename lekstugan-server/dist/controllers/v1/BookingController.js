"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const RequestError_1 = require("../../models/errors/RequestError");
const Booking_1 = __importDefault(require("../../models/mongo/Booking"));
const Association_1 = require("../../models/mongo/Association");
const Mailing_1 = require("../../helpers/Mailing");
/**
 * BookingController
 */
class BookingController {
    /**
     * Get all bookings
     *
     * @param {Request} _req - Request
     * @param {Request} res - Response
     * @param {NextFunction} _next - NextFunction
     */
    async getAll(_req, res, _next) {
        try {
            const bookings = await Booking_1.default.find({}).populate('association');
            bookings.sort((a, b) => {
                return a.date.getTime() - b.date.getTime();
            });
            res.json(bookings);
        }
        catch (error) {
            throw new RequestError_1.RequestError('Could not get bookings', 400);
        }
    }
    /**
     * Post a new booking.
     *
     * @param {Request<IBooking>} req - Request
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async post(req, res, next) {
        try {
            console.log(req.body);
            const association = await Association_1.Association.findOne({
                name: req.body.association.name,
            });
            if (!association) {
                next(new RequestError_1.RequestError('Could not find association', 404));
            }
            else {
                console.log('FOUND', association);
                const booking = new Booking_1.default({
                    date: req.body.date,
                    email: req.body.email,
                    comment: req.body.comment,
                    association: association.id,
                    pending: true,
                });
                await booking.save();
                await booking.populate('association');
                const mailData = {
                    to_email: booking.email || booking.association.email,
                    to_name: booking.association.name,
                    from_name: 'Lekstugan',
                    message: `Your booking request has been recieved and will be
          reviewd shortly, once reviewd you will
          recieve information via email!`,
                    status: 'Recived',
                    date: booking.date.toDateString(),
                };
                const response = await (0, Mailing_1.sendBookingMail)(mailData);
                if (!response.ok) {
                    throw new RequestError_1.RequestError('Could not send mail', 400);
                }
                const text = await response.text();
                console.log(text);
                res.json(booking.id);
            }
        }
        catch (error) {
            console.log(error);
            next(new RequestError_1.RequestError('Could not post booking', 400));
        }
    }
    /**
     * Delete one booking.
     *
     * @param {Request<{ id: string }>} req - Request
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const booking = await Booking_1.default.findById(id).populate('association');
            if (!booking) {
                next(new RequestError_1.RequestError('Could not find booking', 404));
            }
            else {
                if (booking.pending) {
                    const mailData = {
                        to_email: booking.email || booking.association.email,
                        to_name: booking.association.name,
                        from_name: 'Lekstugan',
                        message: `Your booking has been declined,
            please try booking another date.`,
                        status: 'Declined',
                        date: booking.date.toDateString(),
                    };
                    const response = await (0, Mailing_1.sendBookingMail)(mailData);
                    if (!response.ok) {
                        throw new RequestError_1.RequestError('Could not send mail', 400);
                    }
                    await Booking_1.default.findByIdAndDelete(id);
                    res.json({ message: 'Booking deleted' });
                }
                else {
                    await Booking_1.default.findByIdAndDelete(id);
                    res.json({ message: 'Booking deleted' });
                }
            }
        }
        catch (error) {
            next(new RequestError_1.RequestError('Could not find booking', 404));
        }
    }
    /**
     * Accept a booking.
     *
     * @param {Request} req - Request
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async accept(req, res, next) {
        try {
            const { id } = req.params;
            const booking = await Booking_1.default.findById(id).populate('association');
            if (booking) {
                const mailData = {
                    to_email: booking.email || booking.association.email,
                    to_name: booking.association.name,
                    from_name: 'Lekstugan',
                    message: `Your booking has been accepted!`,
                    status: 'Accepted',
                    date: booking.date.toDateString(),
                };
                const response = await (0, Mailing_1.sendBookingMail)(mailData);
                if (!response.ok) {
                    throw new RequestError_1.RequestError('Could not send mail', 400);
                }
                booking.pending = false;
                await booking.save();
                res.json(booking);
            }
        }
        catch (error) {
            next(new RequestError_1.RequestError('Booking not found', 404));
        }
    }
    /**
     * Get all booked dates. PUBLIC.
     *
     * @param {Request} _req - Request
     * @param {Response} res - Response
     * @param {NextFunction} next - NextFunction
     */
    async getBookedDates(_req, res, next) {
        try {
            const bookings = await Booking_1.default.find({});
            const bookedDates = bookings.map((booking) => {
                return booking.date;
            });
            res.json(bookedDates);
        }
        catch (error) {
            next(new RequestError_1.RequestError('Could not get booked dates', 400));
        }
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=BookingController.js.map