import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/**
 * The main component of the application.
 */
export class AppComponent implements OnInit {
  isSticky = false;
  title = 'lekstugan-client';
  isMobile = false;
  linksActive = false;
  isActive = false;
  @ViewChild('links') links!: ElementRef;

  /**
   * Constructor.
   *
   * @param {DeviceDetectorService} deviceService The device service.
   */
  constructor(private deviceService: DeviceDetectorService) {}

  /**
   * On init.
   */
  ngOnInit() {
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      this.isMobile = true;
    }
  }

  /**
   * Toggles the links.
   */
  toggleLinks() {
    this.linksActive = !this.linksActive;
  }
}
