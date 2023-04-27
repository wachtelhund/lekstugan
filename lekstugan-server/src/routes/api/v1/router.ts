import express from 'express';
import { router as imageRouter } from './imageRouter';
import { router as bookingsRouter } from './bookingRouter';
import { router as eventsRouter } from './eventRouter';

export const router = express.Router();

router.get('/', (_req, res) => res.send('API v1'));
router.use('/images', imageRouter);
router.use('/bookings', bookingsRouter);
router.use('/events', eventsRouter);
