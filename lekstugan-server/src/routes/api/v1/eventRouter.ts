import express from 'express';
import { EventController } from '../../../controllers/v1/EventController';
export const router = express.Router();
const controller = new EventController();

router.get('/', (req, res, next) => controller.getAll(req, res, next));
router.post('/', (req, res, next) => controller.post(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));
