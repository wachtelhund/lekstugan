import {HttpClient} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.html',
})
/**
 * The image modal.
 */
export class ImageModal {
  /**
   * Constructor.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

export interface DialogData {
  imageUrl: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})

/**
 * The image component.
 */
export class ImageComponent {
  imageSize = '';
  imageUrl = '';
  isLoading = true;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient, public modal: MatDialog) {
    this.getRandomImageSizes();
    this.getImages();
  }

  /**
   * Opens the modal.
   */
  onOpenModal() {
    this.modal.open(ImageModal, {
      data: {
        imageUrl: this.imageUrl,
      },
    });
  }

  /**
   * Gets random image sizes.
   */
  getRandomImageSizes() {
    this.imageSize = (Math.floor(Math.random() * 4000) + 3000) +
        'x' +
        (Math.floor(Math.random() * 3000) + 2000);
  }

  /**
   * Gets images.
   */
  getImages() {
    const [width, height] = this.imageSize.split('x');
    console.log(width, height);
    this.http.get(`https://random.imagecdn.app/v1/image?width=${width}&height=${height}`
        , {responseType: 'text'}).subscribe((response: string) => {
      this.imageUrl = response;
      console.log(response);
      this.isLoading = false;
    }, (error) => {
      console.log(error);
    });
  }
}
