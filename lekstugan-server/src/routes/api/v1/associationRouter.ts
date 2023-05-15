
import express from 'express';
import {
  AssociationController,
} from '../../../controllers/v1/AssociationController';
import {
  Authentication,
} from '../../../helpers/Authentication';

export const router = express.Router();
const controller = new AssociationController();
const auth = new Authentication();

router.get('/', auth.authenticateAdmin, (req, res, next) =>
  controller.getAll(req, res, next));

router.post('/', auth.authenticateAdmin, (req, res, next) =>
  controller.post(req, res, next));

router.delete('/:id', auth.authenticateAdmin, (req, res, next) =>
  controller.delete(req, res, next));

router.get('/:id/key', auth.authenticateAdmin, (req, res, next) =>
  controller.getNewKey(req, res, next),
);
