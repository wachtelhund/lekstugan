import {EventEmitter, Injectable} from '@angular/core';
import {IBase64Image} from '../types/IBase64Image';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * The image service.
 */
export class ImageService {
  serverUrl = environment.apiURL;
  images: IBase64Image[] = [];
  imageDeleted: EventEmitter<IBase64Image> = new EventEmitter();
  imageAccepted: EventEmitter<IBase64Image> = new EventEmitter();
  fetchingImages = new BehaviorSubject<boolean>(false);
  imagesSubject = new BehaviorSubject<IBase64Image[]>([]);

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches the images.
   *
   * @param {number} limit - The number of images to fetch.
   * @param {number} offset - The offset.
   * @param {boolean} pending - Whether to fetch pending images or not.
   *
   * @return {Observable<IBase64Image[]>} The images.
   */
  getImages(
      limit?: number,
      offset?: number,
      pending?: boolean
  ): Observable<IBase64Image[]> {
    let url = this.serverUrl + '/images';
    if (limit !== undefined && offset !== undefined) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    if (pending !== undefined) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}pending=${pending}`;
    }
    return this.http.get<IBase64Image[]>(url);
  }


  /**
   * Loads the images sequentially.
   *
   * @param {IBase64Image} images - The images to load.
   * @param {number} index - The index of the image to load.
   */
  private loadImagesSequentially(images: IBase64Image[],
      index = 0): void {
    if (index < images.length) {
      const image = images[index];
      const img = new Image();
      img.src = image.base64;
      img.onload = () => {
        this.images.push(image);
        this.imagesSubject.next(this.images);
        this.loadImagesSequentially(images, index + 1);
      };
      img.onerror = () => {
        this.loadImagesSequentially(images, index + 1);
      };
    } else {
      this.fetchingImages.next(false);
    }
  }

  /**
   * Gets the pending images.
   *
   * @return {IBase64Image[]} The pending images.
   */
  getPendingImages(): Observable<IBase64Image[]> {
    return this.imagesSubject.asObservable().pipe(
        map((images) => {
          const pendingImages: IBase64Image[] = [];
          images.forEach((image) => {
            if (image.pending) {
              pendingImages.push(image);
            }
          });
          return pendingImages;
        })
    );
  }

  /**
   * Deletes an image.
   *
   * @param {IBase64Image} image Id of the image to delete.
   */
  deleteImage(image: IBase64Image): void {
    this.http.delete(this.serverUrl + '/images/' + image.id).subscribe(() => {
      this.imageDeleted.emit(image);
    });
  }

  /**
   * Uploads an image.
   *
   * @param {IBase64Image} image The image to upload.
   */
  async uploadImage(image: IBase64Image): Promise<void> {
    const {compressedBase64, width, height} = await compressImage(
        image.base64,
        900
    );
    const compressedImage: IBase64Image = {
      base64: compressedBase64,
      width: width,
      height: height,
    };
    this.http
        .post(this.serverUrl + '/images', compressedImage)
        .subscribe((data) => {
          this.images.push(data as IBase64Image);
        });
  }

  /**
   * Changes the status of an image from pending to accepted.
   *
   * @param {IBase64Image} image The id of the image.
   */
  acceptImage(image: IBase64Image): void {
    this.http
        .post(this.serverUrl + '/images/' + image.id + '/accept', {image})
        .subscribe((data) => {
          this.imageAccepted.emit(data as IBase64Image);
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
      resolve({
        compressedBase64: compressedImage,
        width: newWidth,
        height: newHeight,
      });
    };
    img.onerror = (error) => reject(error);
  });
}
