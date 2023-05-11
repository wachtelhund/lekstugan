import express from 'express';
import {EventController} from '../../../controllers/v1/EventController';
import {
  Authentication,
} from '../../../helpers/Authentication';
export const router = express.Router();
const controller = new EventController();
const auth = new Authentication();

router.get('/', (req, res, next) => controller.getAll(req, res, next));

router.post('/', auth.authenticateAdmin, (req, res, next) =>
  controller.post(req, res, next));

router.delete('/:id', auth.authenticateAdmin, (req, res, next) =>
  controller.delete(req, res, next));
