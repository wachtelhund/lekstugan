import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  /**
   * Constructor.
   *
   * @param {HttpClient} http The http client.
   */
  constructor(private http: HttpClient) {
    this.getRandomImageSizes();
    this.getImages();
  }


  /**
   * Gets random image sizes.
   */
  getRandomImageSizes() {
    for (let i = 0; i < this.amount; i++) {
      this.imageSizes.push(`${Math.floor(Math.random() * 3264) + 100}
          x${Math.floor(Math.random() * 3024) + 100}`);
    }
  }

  /**
   * Gets images.
   */
  getImages() {
    for (let i = 0; i < this.amount; i++) {
      const [width, height] = this.imageSizes[i].split('x');
      this.http.get(`https://random.imagecdn.app/v1/image?width=${width}&height=${height}`
          , {responseType: 'text'}).subscribe((response: string) => {
        this.imageUrls.push(response);
      }, (error) => {
        console.log(error);
      });
    }
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

