import {Injectable} from '@angular/core';
import {IBase64Image} from '../pages/image-gallery/IBase64Image';

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
    for (let i = 0; i < 50; i++) {
      this.getRandomBase64Image()
          .then((image) => {
            this.images.push(image);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }

  /**
   * Gets the accepted images.
   *
   * @return {IBase64Image[]} The images.
   */
  getImages(): IBase64Image[] {
    return this.images;
  }

  /**
   * Gets the pending images.
   *
   * @return {IBase64Image[]} The pending images.
   */
  getPendingImages(): IBase64Image[] {
    return this.images;
  }

  /**
   * Uploads an image.
   *
   * @param {IBase64Image} image The image to upload.
   */
  async uploadImage(image: IBase64Image): Promise<void> {
    const {compressedBase64,
      width,
      height,
    } = await compressImage(image.base64, 900);
    const compressedImage: IBase64Image = {
      base64: compressedBase64,
      width: width,
      height: height,
    };
    this.images.push(compressedImage);
  }

  /**
   * Gets a random base64 image. This is for testing purposes.
   *
   * @return {Promise<IBase64Image>} The base64 image.
   */
  async getRandomBase64Image(): Promise<IBase64Image> {
    const width = 800;
    const height = 600;
    const res = await fetch(`https://picsum.photos/${width}/${height}`);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          base64: reader.result as string,
          width: width,
          height: height,
        });
      };
      reader.onerror = () => {
        return reject(new Error('Could not read image'));
      };
      reader.readAsDataURL(blob);
    });
  }
}

/**
 * Compresses an image to a given width and quality.
 *
 * @param {string} src The image source
 * @param {number} maxWidth The maximum width of the image
 * @param {number} quality Quality of the image, between 0 and 1. Default is 0.8
 * @return {Promise<string>} A promise with the compressed image
 */
function compressImage(
    src: string,
    maxWidth: number,
    quality = 0.8
): Promise<{ compressedBase64: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const newWidth = Math.min(img.width, maxWidth);
      const newHeight = newWidth / aspectRatio;

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d');
      if (ctx === null) {
        reject(Error('Failed to get canvas 2d context'));
        return;
      }
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const compressedImage = canvas.toDataURL('image/jpeg', quality);
      resolve({compressedBase64: compressedImage,
        width: newWidth,
        height: newHeight,
      });
    };
    img.onerror = (error) => reject(error);
  });
}
