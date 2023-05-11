/**
 * Main router.
 *
 * @author Hampus Nilsson
 * @version 1.0.0
 */
import express from 'express'
import { UserController } from '../../../controllers/api/user-controller.js'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

const controller = new UserController()

export const router = express.Router()

/**
 * Authorizes the user based on the JWT.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authorizeAdmin = (req, res, next) => {
  try {
    const type = req.headers.authorization?.split(' ')[0]
    const token = req.headers.authorization?.split(' ')[1]
    if (type !== 'Bearer' || !token) {
      throw new Error()
    }
    const payload = jwt.verify(
      token, process.env.JWT_SECRET_PUBLIC
    )
    if (payload.x_permission_level >= 8) {
      next()
    }
  } catch (error) {
    next(createError(401, 'You are not authorized to access this resource.'))
  }
}

router.get('/', (req, res, next) => res.json({ message: 'Welcome to the authentication service!' }))
router.post('/register', authorizeAdmin, (req, res, next) => controller.register(req, res, next))
router.post('/login', (req, res, next) => controller.login(req, res, next))
