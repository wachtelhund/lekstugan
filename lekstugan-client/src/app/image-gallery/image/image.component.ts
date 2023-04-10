import {HttpClient} from '@angular/common/http';
import {Component, Inject, Input} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IBase64Image} from '../IBase64Image';

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
  base64: string;
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
  isLoading = false;
  @Input() imageData!: IBase64Image;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient, public modal: MatDialog) {}

  /**
   * Opens the modal.
   */
  onOpenModal() {
    this.modal.open(ImageModal, {
      data: {
        base64: this.imageData.base64,
      },
    });
  }
}
