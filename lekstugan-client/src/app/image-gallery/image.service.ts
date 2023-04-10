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
          pending: false,
          width: width,
          height: height,
          type: ImageType.jpg,
          id: this.images.length,
        });
      };
      reader.onerror = () => {
        return reject(new Error('Could not read image'));
      };
      reader.readAsDataURL(blob);
    });
  }
}
