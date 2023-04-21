import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBase64Image} from '../../types/IBase64Image';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
/**
 * The image gallery component.
 */
export class ImageGalleryComponent {
  imageUrls: string[] = [];
  imageSizes: string[] = [];
  amount = 2;
  images: IBase64Image[] = [];

  /**
   * Constructor.
   *
   * @param {HttpClient} http The http client.
   */
  constructor(private http: HttpClient, private imageService: ImageService) {
    this.imageService.getImages().subscribe((images) => {
      this.images = images.filter((i) => !i.pending);
    });
    this.imageService.imageDeleted.subscribe((image) => this.onDeleted(image));
    this.imageService.imageAccepted.subscribe((image) => {
      this.onAccepted(image);
    });
  }

  /**
   * When an image is deleted.
   *
   * @param {IBase64Image} image The image to delete.
   */
  onDeleted(image: IBase64Image) {
    this.images = this.images.filter((i) => i.id !== image.id);
  }

  /**
   * On image accepted.
   *
   * @param {IBase64Image} image The accepted image.
   */
  onAccepted(image: IBase64Image) {
    this.images.push(image);
  }

  /**
   * Gets the number of columns.
   *
   * @return {int} The number of columns.
   */
  setColNum() {
    if (window.innerWidth < 600) {
      return 1;
    } else if (window.innerWidth < 960) {
      return 2;
    } else if (window.innerWidth < 1280) {
      return 3;
    } else if (window.innerWidth < 1920) {
      return 4;
    } else {
      return 5;
    }
  }
}
