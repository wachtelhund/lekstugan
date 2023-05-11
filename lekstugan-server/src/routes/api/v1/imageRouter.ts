import express from 'express';
import {ImageController} from '../../../controllers/v1/ImageController';
import {
  Authentication, AuthenticatedRequest,
} from '../../../helpers/Authentication';
export const router = express.Router();
const controller = new ImageController();
const auth = new Authentication();

router.get('/', auth.attachUserPayload,
    (req: AuthenticatedRequest, res, next) =>
      controller.getAll(req, res, next)
);

router.post('/', (req, res, next) => controller.post(req, res, next));

router.delete('/:id', auth.authenticateAdmin, (req, res, next) =>
  controller.delete(req, res, next)
);

router.post('/:id/accept', auth.authenticateAdmin, (req, res, next) =>
  controller.accept(req, res, next),
);
