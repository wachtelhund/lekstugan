import { Request, Response, NextFunction } from 'express';
import Image from '../../models/mongo/Image';
import { IBase64Image } from '../../models/interfaces/IBase64Image';
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
  public async getAll(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const images = await Image.find({});
    res.json(images);
  }

  /**
   * Post a new image
   *
   * @param {Request} req - Request
   * @param {Request} res - Response
   * @param {NextFunction} _next - NextFunction
   */
  public async post(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { base64, width, height } = req.body;
    const image = new Image<IBase64Image>({
      base64,
      width,
      height,
      pending: true,
    });
    await image.save();
    res.json(image.id);
  }
}
