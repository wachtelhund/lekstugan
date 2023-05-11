import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {RequestError} from '../models/errors/RequestError';
import {IUserPayload} from '../models/types/IUserPayload';

export interface AuthenticatedRequest extends Request {
  userPayload?: IUserPayload;
}

/**
 * Authentication helper class.
 */
export class Authentication {
  /**
   * Authenticate a user.
   *
   * @param {Request} req - The request.
   * @param {Response} _res - The response.
   * @param {NextFunction} next - The next function.
   */
  authenticateAdmin(req: Request, _res: Response, next: NextFunction) {
    try {
      const type = req.headers.authorization?.split(' ')[0];
      const token = req.headers.authorization?.split(' ')[1];
      if (type !== 'Bearer' || !token) {
        throw new Error();
      }
      const payload = jwt.verify(
          token, process.env.JWT_SECRET as string
      ) as IUserPayload;
      if (payload.x_permission_level >= 8) {
        (req as AuthenticatedRequest).userPayload = payload;
        next();
      }
    } catch (error) {
      next(new RequestError('You are not authorized.', 401));
    }
  }

  /**
   * Attach user payload to request.
   *
   * @param {Request} req - The request.
   * @param {Response} _res - The response.
   * @param {NextFunction} next - The next function.
   */
  attachUserPayload(req: Request, _res: Response, next: NextFunction) {
    try {
      const type = req.headers.authorization?.split(' ')[0];
      const token = req.headers.authorization?.split(' ')[1];
      if (type === 'Bearer' && token) {
        const payload = jwt.verify(
            token, process.env.JWT_SECRET as string
        ) as IUserPayload;
        (req as AuthenticatedRequest).userPayload = payload;
      }
      next();
    } catch (error) {
      next();
    }
  }

  /**
   * Check if a user is authenticated if so, add userPayload to request.
   */
}
