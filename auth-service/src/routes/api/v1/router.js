/**
 * Main router.
 *
 * @author Hampus Nilsson
 * @version 1.0.0
 */
import express from 'express'
import { UserController } from '../../../controllers/api/user-controller.js'

const controller = new UserController()

export const router = express.Router()

router.get('/', (req, res, next) => res.json({ message: 'Welcome to the authentication service!' }))
router.post('/register', (req, res, next) => controller.register(req, res, next))
router.post('/login', (req, res, next) => controller.login(req, res, next))
