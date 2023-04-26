import express from 'express';
import { BookingController } from '../../../controllers/v1/BookingController';
export const router = express.Router();
const controller = new BookingController();

router.get('/', (req, res, next) => controller.getAll(req, res, next));
router.post('/', (req, res, next) => controller.post(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));
router.post('/:id/accept', (req, res, next) =>
  controller.accept(req, res, next),
);
