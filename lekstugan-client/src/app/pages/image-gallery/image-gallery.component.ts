import {Component, ElementRef, ViewChild} from '@angular/core';

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
  limit = 15;
  offset = 0;
  loading = false;
  @ViewChild('scrollTarget', {static: true}) scrollTarget!: ElementRef;
  private intersectionObserver!: IntersectionObserver;
  allImagesLoaded = false;

  /**
   * Constructor.
   *
   * @param {HttpClient} http The http client.
   */
  constructor(private http: HttpClient, private imageService: ImageService) {}

  /**
   * On init.
   */
  ngOnInit() {
    this.loadImages();
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onScroll();
        }
      });
    });

    this.intersectionObserver.observe(this.scrollTarget.nativeElement);
  }

  /**
   * On destroy.
   */
  ngOnDestroy() {
    this.intersectionObserver.disconnect();
  }


  /**
   * Loads the images.
   */
  loadImages() {
    if (this.allImagesLoaded) {
      return;
    }

    this.loading = true;
    this.imageService.getImages(this.limit, this.offset).subscribe((images) => {
      if (images.length < this.limit) {
        this.allImagesLoaded = true;
        this.intersectionObserver.disconnect();
      } else {
        this.offset += this.limit;
      }
      this.images.push(...images.filter((i) => !i.pending));
      this.loading = false;
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
   * On scroll. Loads more images.
   */
  onScroll(): void {
    if (!this.loading) {
      this.loadImages();
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
