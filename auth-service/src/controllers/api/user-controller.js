import { User } from '../../models/user.js'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
/**
 * Handles the user related requests.
 */
export class UserController {
  /**
   * Handles the registration of a new user.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async register (req, res, next) {
    const data = req.body
    try {
      const user = new User({
        email: data.email,
        password: data.password,
        permissionLevel: 8
      })

      await user.save()

      console.log('USER SAVED')

      res
        .status(201)
        .json({ id: user._id })
    } catch (error) {
      let e = error
      if (e.code === 11000) {
        e = createError(409, 'Email already exists.')
        e.cause = error
      } else if (error.name === 'ValidationError') {
        e = createError(400, 'Invalid data.')
        e.cause = error
      }
      next(e)
    }
  }

  /**
   * Handles the login of a user. Deals with the JWT.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.isCorrectPassword(req.body.email, req.body.password)

      const payload = {
        email: user.email,
        x_permission_level: user.permissionLevel,
        x_user_id: user._id
      }

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(201)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      const { email, password } = req.body
      if (email === process.env.SUPER_USER && password === process.env.SUPER_USER_PASSWORD) {
        const payload = {
          email: process.env.SUPER_USER,
          x_permission_level: 8,
          x_user_id: 'superuser'
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          algorithm: 'RS256',
          expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        res
          .status(201)
          .json({
            access_token: accessToken
          })
      }
      const err = createError(401, 'Invalid login.')
      err.cause = error
      next(err)
    }
  }

  /**
   * Gets all the users.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getAllUsers (req, res, next) {
    try {
      const users = await User.find({})
      const emails = users.map(user => user.email)
      res.json(emails)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a user based on the email.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async deleteUser (req, res, next) {
    try {
      await User.deleteOne({ email: req.params.email })
      res.json({ message: 'User deleted.' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Adds a new user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async addUser (req, res, next) {
    try {
      // console.log(req.body);
      const user = new User({ ...req.body.user, permissionLevel: 8 })
      // console.log(user);
      await user.save()
      res.json({ message: 'User added.' })
    } catch (error) {
      next(error)
    }
  }
}
