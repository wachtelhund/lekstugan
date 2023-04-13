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
    reader.onload = async () => {
      const base64 = reader.result as string;
      await this.handleImage(base64);
    };
  }

  /**
   * Handle image.
   *
   * @param {string} base64 - Base64 image.
   * @return {Promise<void>} Promise.
   */
  async handleImage(base64: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.src = base64;
      image.onload = () => {
        this.imageService.uploadImage({
          base64: image.src,
          width: image.width,
          height: image.height,
        } as IBase64Image);
        resolve(image);
      };
      image.onerror = (error) => reject(error);
    });
  }
}
