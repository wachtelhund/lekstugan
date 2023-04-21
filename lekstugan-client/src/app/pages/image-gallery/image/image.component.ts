import {HttpClient} from '@angular/common/http';
import {Component, Inject, Input} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {IBase64Image} from '../../../types/IBase64Image';
import {ImageService} from '../../../services/image.service';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<ImageModal>
  ) {}

  /**
   * Deletes the image.
   * @param {MouseEvent} $event The event.
   */
  onDelete() {
    this.imageService.deleteImage(this.data as IBase64Image);
    this.dialogRef.close();
  }
}

export interface DialogData {
  base64: string;
  id: string;
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
  constructor(private http: HttpClient, public modal: MatDialog,
    private imageService: ImageService) {}

  /**
   * Opens the modal.
   */
  onOpenModal() {
    this.modal.open(ImageModal, {
      data: {
        base64: this.imageData.base64,
        id: this.imageData.id,
        width: this.imageData.width,
        height: this.imageData.height,
      } as IBase64Image,
    });
  }

  /**
   * Accepts the image.
   */
  onAccept() {
    if (this.imageData.id === undefined) {
      throw new Error('Image id is undefined');
    }
    console.log('ON ACCEPT IMAGE COMPONENT');
    this.imageService.acceptImage(this.imageData as IBase64Image);
    this.imageData.pending = false;
  }

  /**
   * Deletes the image.
   *
   * @param {IBase64Image} image The event.
   */
  onDelete(image: IBase64Image) {
    this.imageService.deleteImage(image);
  }
}
