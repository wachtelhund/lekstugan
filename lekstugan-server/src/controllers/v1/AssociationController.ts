import {Request, Response, NextFunction} from 'express';
import {
  Association,
  getRandomKey,
} from '../../models/mongo/Association';
import Booking from '../../models/mongo/Booking';
import {ITypedRequestBody} from '../../models/types/ITypedRequestBody';
import {IAssociation} from '../../models/types/IAssociation';
import {RequestError} from '../../models/errors/RequestError';
import {IMailParams} from '../../models/types/IMailParams';
import {sendBookingMail} from '../../helpers/Mailing';

/**
 * AssociationController
 */
export class AssociationController {
  /**
   * Get all associations
   *
   * @param {Request} _req - Request
   * @param {Request} res - Response
   * @param {NextFunction} next - NextFunction
   */
  async getAll(
      _req: Request,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const associations = await Association.find({});
      const mappedAssociations = associations.map((association) => {
        return {
          id: association.id,
          name: association.name,
          email: association.email,
        };
      });
      res.json(mappedAssociations);
    } catch (error) {
      next(new RequestError('Could not get associations', 400));
    }
  }

  /**
   * Post a new association.
   *
   * @param {ITypedRequestBody<IAssociation>} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  async post(
      req: ITypedRequestBody<IAssociation>,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const key = getRandomKey();
      const association = new Association({
        name: req.body.name,
        email: req.body.email,
        key,
      });
      await association.save();
      res.json(association.id);
    } catch (error) {
      next(new RequestError('Could not create association', 400));
    }
  }

  /**
   * Delete an association.
   *
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  async delete(
      req: Request,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      await Booking.deleteMany({association: id});
      await Association.findByIdAndDelete(id);
      res.json({message: 'Association deleted'});
    } catch (error) {
      next(new RequestError('Could not delete association', 400));
    }
  }

  /**
   * Generate a new key for an association.
   *
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  async getNewKey(
      req: Request,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const association = await Association.findById(req.params.id);
      if (!association) {
        next(new RequestError('Could not find association', 404));
      } else {
        const key = getRandomKey();
        const mailData = {
          to_email: association.email,
          to_name: association.name,
          from_name: 'Lekstugan',
          key,
        } as IMailParams;
        const response = await sendBookingMail(mailData);
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          res.json('Could not send key to association, please try again later');
        } else {
          const text = await response.text();
          console.log(text);

          association.key = key;
          await association.save();
          res.json(`Key has been sent to association (${association.name})`);
        }
      }
    } catch (error) {
      next(new RequestError('Could not generate new key', 400));
    }
  }
}
