import { Request, Response, NextFunction } from 'express';
/**
 * ImageController
 */
export class ImageController {
  /**
   * Get all images
   *
   * @param {Request} _req - Request
   * @param {Request} res - Response
   * @param {NextFunction} _next - NextFunction
   */
  public getAll(_req: Request, res: Response, _next: NextFunction): void {
    res.send('ImageController.index');
  }
}
