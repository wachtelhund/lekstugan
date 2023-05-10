import {HttpClient} from '@angular/common/http';
import {Component, Inject, Input} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {IBase64Image} from '../../../types/IBase64Image';
import {ImageService} from '../../../services/image.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.html',
})
/**
 * The image modal.
 */
export class ImageModal {
  isAdmin = false;
  /**
   * Constructor.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<ImageModal>,
    private auth: AuthService,
  ) {}

  /**
   * On init.
   */
  ngOnInit() {
    if (this.auth.currentUser.value?.x_permission_level === 8) {
      this.isAdmin = true;
    }
  }

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
  isMobile = false;
  isAdmin = false;
  @Input() imageData!: IBase64Image;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient, public modal: MatDialog,
    private imageService: ImageService,
    private deviceService: DeviceDetectorService,
    private auth: AuthService) {}

  /**
   * On init.
   */
  ngOnInit() {
    if (this.auth.currentUser.value?.x_permission_level === 8) {
      this.isAdmin = true;
    }
  }

  /**
   * Opens the modal.
   */
  onOpenModal() {
    if (this.isAdmin || !this.deviceService.isMobile()) {
      this.modal.open(ImageModal, {
        data: {
          base64: this.imageData.base64,
          id: this.imageData.id,
          width: this.imageData.width,
          height: this.imageData.height,
        } as IBase64Image,
      });
    }
  }

  /**
   * Accepts the image.
   */
  onAccept() {
    if (this.imageData.id === undefined) {
      throw new Error('Image id is undefined');
    }
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
