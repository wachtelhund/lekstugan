import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.html',
})
export class ImageModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  imageSize: String = '';
  imageUrl: String = '';
  isLoading: boolean = true;

  constructor(private http: HttpClient, public modal: MatDialog) {
    this.getRandomImageSizes();
    this.getImages();
  }

  onOpenModal() {
    const modalRef = this.modal.open(ImageModal, {
      data: {
        imageUrl: this.imageUrl
      }
    });
  }

  getRandomImageSizes() {
    this.imageSize = (`${Math.floor(Math.random() * 4000) + 3000}x${Math.floor(Math.random() * 3000) + 2000}`);
  }

  getImages() {
    const [width, height] = this.imageSize.split('x');
    console.log(width, height);
    this.http.get(`https://random.imagecdn.app/v1/image?width=${width}&height=${height}`, { responseType: 'text' }).subscribe((response: any) => {
      this.imageUrl = response;
      console.log(response);
      this.isLoading = false;
    }, (error) => {
      console.log(error);
    });
  }
}
