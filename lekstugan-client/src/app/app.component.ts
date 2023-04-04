import {Component} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/**
 * The main component of the application.
 */
export class AppComponent {
  isSticky = false;
  title = 'lekstugan-client';
  isMobile = false;

  /**
   * Constructor.
   *
   * @param {DeviceDetectorService} deviceService The device service.
   */
  constructor(private deviceService: DeviceDetectorService) {
    this.setIsMobile();
  }

  /**
   * Sets the isMobile property.
   */
  setIsMobile() {
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      this.isMobile = true;
    }
  }
}
