import {Request, Response, NextFunction} from 'express';
import {IBooking} from '../../models/types/IBooking';
import {ITypedRequestBody} from '../../models/types/ITypedRequestBody';
import {RequestError} from '../../models/errors/RequestError';
import Booking from '../../models/mongo/Booking';

/**
 * BookingController
 */
export class BookingController {
  /**
   * Get all bookings
   *
   * @param {Request} _req - Request
   * @param {Request} res - Response
   * @param {NextFunction} _next - NextFunction
   */
  async getAll(
      _req: Request,
      res: Response<IBooking[]>,
      _next: NextFunction,
  ): Promise<void> {
    try {
      const bookings = await Booking.find({});
      bookings.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
      res.json(bookings);
    } catch (error) {
      throw new RequestError('Could not get bookings', 400);
    }
  }

  /**
   * Post a new booking.
   *
   * @param {Request<IBooking>} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  async post(
      req: ITypedRequestBody<IBooking>,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const booking = new Booking<IBooking>({
        date: req.body.date,
        email: req.body.email,
        comment: req.body.comment,
        association: req.body.association,
        pending: true,
      });
      await booking.save();
      res.json(booking.id);
    } catch (error) {
      next(new RequestError('Could not post booking', 400));
    }
  }

  /**
   * Delete one booking.
   *
   * @param {Request<{ id: string }>} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id} = req.params;
      console.log(id);
      await Booking.findByIdAndDelete(id);
      res.json({message: 'Booking deleted'});
    } catch (error) {
      next(new RequestError('Could not find booking', 404));
    }
  }

  /**
   * Accept a booking.
   *
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  public async accept(
      req: ITypedRequestBody<IBooking>,
      res: Response<IBooking>,
      next: NextFunction,
  ): Promise<void> {
    try {
      const {id} = req.params;
      const booking = await Booking.findById(id);
      if (booking) {
        booking.pending = false;
        await booking.save();
        res.json(booking);
      }
    } catch (error) {
      next(new RequestError('Booking not found', 404));
    }
  }
}
