import {Component} from '@angular/core';
import {IBase64Image} from 'src/app/pages/image-gallery/IBase64Image';
import {ImageService} from 'src/app/services/image.service';

@Component({
  selector: 'app-post-button',
  templateUrl: './post-button.component.html',
  styleUrls: ['./post-button.component.scss'],
})
/**
 * Post button component.
 */
export class PostButtonComponent {
  fileName!: string;
  resizedBase64Image!: string;
  /**
   * Constructor.
   */
  constructor(private imageService: ImageService) { }

  /**
   * On file input.
   *
   * @param {Event} $event - Event.
   */
  onFileInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (!target.files) {
      throw new Error('No files found');
    }
    const file: File = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      this.imageService.uploadImage({
        base64: reader.result as string,
        width: image.width,
        height: image.height,
      } as IBase64Image);
    };
  }
}

/**
 * Resize a base64 image.
 *
 * @param {string} src Base64 image.
 * @param {number} newX New width.
 * @param {number} newY New height.
 * @return {Promise<String>} Promise with new base64 image.
 */
export function compressImage(src: string,
    newX: number,
    newY: number): Promise<string> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d');
      if (!ctx) {
        rej(Error('Error creating canvas'));
        return;
      }
      ctx.drawImage(img, 0, 0, newX, newY);
      const data = ctx.canvas.toDataURL();
      res(data);
    };
    img.onerror = (error) => rej(error);
  });
}
