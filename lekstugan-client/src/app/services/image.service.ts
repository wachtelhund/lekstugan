import {Injectable} from '@angular/core';
import {IBase64Image} from '../pages/image-gallery/IBase64Image';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * The image service.
 */
export class ImageService {
  serverUrl = 'http://localhost:5000/api/v1';
  images: IBase64Image[] = [];

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the accepted images.
   *
   * @return {IBase64Image[]} The images.
   */
  getImages(): Observable<IBase64Image[]> {
    return this.http.get<IBase64Image[]>(this.serverUrl + '/images');
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
    this.http.post(this.serverUrl + '/images',
        compressedImage).subscribe((data) => {
      this.images.push(data as IBase64Image);
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
