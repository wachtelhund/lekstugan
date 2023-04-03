import { Component} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSticky: boolean = false;
  title = 'lekstugan-client';
  isMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService) {
    this.setIsMobile();
  }

  setIsMobile() {
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      this.isMobile = true;
    }
  }
}
