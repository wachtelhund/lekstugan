import express from 'express';
import { router as v1Router } from './v1/router';
import { RequestError } from '../../models/errors/RequestError';

export const router = express.Router();

router.use('/api/v1', v1Router);

router.use('*', (_req, _res, next) => {
  next(new RequestError('Not Found', 404))
});
