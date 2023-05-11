import express, {Request, Response, NextFunction} from 'express';
import {BookingController} from '../../../controllers/v1/BookingController';
import {
  Authentication,
} from '../../../helpers/Authentication';

export const router = express.Router();
const controller = new BookingController();
const auth = new Authentication();

// @ts-ignore
const authenticateAsscoiation =
  // @ts-ignore
  (req: Request, res: Response, next: NextFunction) => {
    //check if user is has auth key
    next();
  };

router.get('/', auth.authenticateAdmin, (req, res, next) =>
  controller.getAll(req, res, next));

router.post('/', authenticateAsscoiation, (req, res, next) =>
  controller.post(req, res, next));

router.delete('/:id', auth.authenticateAdmin, (req, res, next) =>
  controller.delete(req, res, next));

router.post('/:id/accept', auth.authenticateAdmin, (req, res, next) =>
  controller.accept(req, res, next),
);
