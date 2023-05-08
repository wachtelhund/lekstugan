import {NextFunction, Request, Response} from 'express';
import Event from '../../models/mongo/Event';
import {IEventData} from '../../models/types/IEventData';
import {ITypedRequestBody} from '../../models/types/ITypedRequestBody';
import {RequestError} from '../../models/errors/RequestError';

/**
 * EventController
 */
export class EventController {
  /**
   * Get all events
   *
   * @param {Request} _req - Request
   * @param {Response<IEventData[]>} res - Response
   * @param {NextFunction} _next - NextFunction
   */
  public async getAll(
      _req: Request,
      res: Response<IEventData[]>,
      _next: NextFunction,
  ): Promise<void> {
    const events = await Event.find({});
    res.json(events);
  }

  /**
   * Create a new event
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async post(
      req: ITypedRequestBody<IEventData>,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const {title, description, date, image, link} = req.body as IEventData;
      const event = new Event<IEventData>({
        title,
        description,
        date,
        image,
        link,
      });
      await event.save();
      res.json(event.id);
    } catch (error) {
      next(new RequestError('Could not post event', 400));
    }
  }

  /**
   * Delete an event
   *
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  public async delete(
      req: Request,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const {id} = req.params;
      await Event.findByIdAndDelete(id);
      res.json({message: 'Event deleted'});
    } catch (error) {
      next(new RequestError('Could not delete event', 400));
    }
  }
}
