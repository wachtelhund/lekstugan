import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBase64Image} from './IBase64Image';
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
    this.images = this.imageService.getImages();
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

