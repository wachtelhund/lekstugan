import express from 'express';
import { router as imageRouter } from './imageRouter';

export const router = express.Router();

router.get('/', (_req, res) => res.send('API v1'));
router.use('/images', imageRouter);
// router.use('/events', eventsRouter);
// router.use('/bookings', bookingsRouter);
