import express, {Request, Response, NextFunction} from 'express';
import {BookingController} from '../../../controllers/v1/BookingController';
import {
  Authentication,
} from '../../../helpers/Authentication';
import {isCorrectPassword} from '../../../models/mongo/Association';
import {RequestError} from '../../../models/errors/RequestError';

export const router = express.Router();
const controller = new BookingController();
const auth = new Authentication();

const authenticateAsscoiation =
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const association = await isCorrectPassword(req.body.association.name,
          req.body.association.key);
      if (!association) {
        next(new RequestError('Invalid key', 401));
      }
      next();
    } catch (error) {
      next(new RequestError('Invalid key', 401));
    }
  };

router.post('/', authenticateAsscoiation, (req, res, next) =>
  controller.post(req, res, next));

router.get('/', auth.authenticateAdmin, (req, res, next) =>
  controller.getAll(req, res, next));

router.get('/bookeddates', (req, res, next) => {
  controller.getBookedDates(req, res, next);
});

router.delete('/:id', auth.authenticateAdmin, (req, res, next) =>
  controller.delete(req, res, next));

router.post('/:id/accept', auth.authenticateAdmin, (req, res, next) =>
  controller.accept(req, res, next),
);
