import {Request, Response, NextFunction} from 'express';
import {
  Association,
  getRandomKey,
} from '../../models/mongo/Association';
import Booking from '../../models/mongo/Booking';
import {ITypedRequestBody} from '../../models/types/ITypedRequestBody';
import {IAssociation} from '../../models/types/IAssociation';
import {RequestError} from '../../models/errors/RequestError';

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
      next(new Error('Could not post association'));
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
      next(new Error('Could not delete association'));
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
        association.key = key;
        await association.save();
        res.json(key);
      }
    } catch (error) {
      next(new RequestError('Could not generate new key', 400));
    }
  }
}
