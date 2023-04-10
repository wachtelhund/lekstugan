import {Injectable} from '@angular/core';
import {IBase64Image, ImageType} from './IBase64Image';

@Injectable({
  providedIn: 'root',
})
/**
 * The image service.
 */
export class ImageService {
  images: IBase64Image[] = [];

  /**
   * Constructor.
   */
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.images.push(this.generateRandomBase64Image(500, 500));
    }
  }

  /**
   * Gets the accepted images.
   *
   * @return {IBase64Image[]} The images.
   */
  getImages(): IBase64Image[] {
    return this.images.filter((image) => !image.pending);
  }

  /**
   * Gets the pending images.
   *
   * @return {IBase64Image[]} The pending images.
   */
  getPendingImages(): IBase64Image[] {
    return this.images.filter((image) => image.pending);
  }

  /**
   * Uploads an image.
   *
   * @param {IBase64Image} image The image to upload.
   */
  uploadImage(image: IBase64Image): void {
    image.pending = true;
    this.images.push(image);
  }

  /**
   * Generates a random base64 image.
   * This is used for testing purposes.
   *
   * @param {number} width - The width of the image.
   * @param {number} height - The height of the image.
   * @param {string} format - The format of the image.
   * @param {number} quality - The quality of the image.
   * @return {string} The base64 image.
   */
  generateRandomBase64Image(width: number,
      height: number,
      format: ImageType = ImageType.png,
      quality = 0.9): IBase64Image {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas 2D context');
    }

    const imageData = ctx.createImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = Math.floor(Math.random() * 256); // Red
      imageData.data[i + 1] = Math.floor(Math.random() * 256); // Green
      imageData.data[i + 2] = Math.floor(Math.random() * 256); // Blue
      imageData.data[i + 3] = 255; // Alpha (255 = fully opaque)
    }

    ctx.putImageData(imageData, 0, 0);

    const base64 = canvas.toDataURL(format, quality);

    return {
      base64,
      width,
      height,
      type: format,
      pending: false,
      id: Math.floor(Math.random() * 1000000),
    };
  }
}
