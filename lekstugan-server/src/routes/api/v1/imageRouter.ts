import express from 'express';
import { ImageController } from '../../../controllers/v1/ImageController';
export const router = express.Router();
const controller = new ImageController();

router.get('/', (req, res, next) => controller.getAll(req, res, next));
