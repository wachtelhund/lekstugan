import {Request, Response, NextFunction} from 'express';
import Image from '../../models/mongo/Image';
import {IBase64Image} from '../../models/types/IBase64Image';
import {RequestError} from '../../models/errors/RequestError';
import {ITypedRequestBody} from '../../models/types/ITypedRequestBody';
/**
 * ImageController
 */
export class ImageController {
  /**
   * Get all images
   *
   * @param {Request} req - Request
   * @param {Response<IBase64Image[]>} res - Response
   * @param {NextFunction} _next - NextFunction
   */
  public async getAll(
      req: Request,
      res: Response<IBase64Image[]>,
      _next: NextFunction,
  ): Promise<void> {
    const limit = parseInt(req.query.limit as string) || undefined;
    const offset = parseInt(req.query.offset as string) || undefined;

    const pending = req.query.pending === 'true';

    const query = Image.find({pending: pending});

    query.sort({createdAt: -1});

    if (limit !== undefined) {
      query.limit(limit);
      console.log(limit);
    }

    if (offset !== undefined) {
      query.skip(offset);
      console.log(offset);
    }

    const images = await query.exec();

    res.json(images);
  }

  /**
   * Post a new image
   *
   * @param {Request<IBase64Image>} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   */
  public async post(
      req: ITypedRequestBody<IBase64Image>,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: Validate image data using Sharp
      const {base64, width, height} = req.body;
      const image = new Image<IBase64Image>({
        base64,
        width,
        height,
        pending: true,
      });
      await image.save();
      res.json(image.id);
    } catch (error) {
      next(new RequestError('Could not post image', 404));
    }
  }

  /**
   * Delete an image
   *
   * @param {Request} req - Request
   * @param {Request} res - Response
   * @param {NextFunction} next - NextFunction
   */
  public async delete(
      req: Request,
      res: Response,
      next: NextFunction,
  ): Promise<void> {
    try {
      const {id} = req.params;
      await Image.findByIdAndDelete(id);
      res.json({message: 'Image deleted'});
    } catch (error) {
      next(new RequestError('Image not found', 404));
    }
  }

  /**
   * Accept an image.
   * @param {Request<IBase64Image>} req - Request
   * @param {Response<IBase64Image>} res - Response
   * @param {NextFunction} next - NextFunction
   */
  public async accept(
      req: ITypedRequestBody<IBase64Image>,
      res: Response<IBase64Image>,
      next: NextFunction,
  ): Promise<void> {
    try {
      const {id} = req.params;
      console.log(id);
      const image = await Image.findById(id);
      if (image) {
        image.pending = false;
        await image.save();
        res.json(image);
      }
    } catch (error) {
      next(new RequestError('Image not found', 404));
    }
  }
}
