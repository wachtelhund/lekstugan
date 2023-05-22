import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthService} from './services/auth.service';
import {IUserPayload} from './types/IUserPayload';
import jwtDecode, {JwtPayload} from 'jwt-decode';

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
  title = 'Lekstugan';
  isMobile = false;
  linksActive = false;
  isActive = false;
  isAdmin = false;
  @ViewChild('links') links!: ElementRef;

  /**
   * Constructor.
   *
   * @param {DeviceDetectorService} deviceService The device service.
   */
  constructor(private deviceService: DeviceDetectorService,
    private auth: AuthService) {}

  /**
   * On init.
   */
  ngOnInit() {
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      this.isMobile = true;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode<JwtPayload>(token) as IUserPayload;
      if (user.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        this.auth.currentUser.next(null);
      } else {
        this.auth.token.next(token);
        this.auth.currentUser
            .next(user);
      }
    }
    this.auth.currentUser.subscribe((user) => {
      if (user && user?.x_permission_level >= 8) {
        this.isAdmin = true;
      }
    });
  }

  /**
   * Toggles the links.
   */
  toggleLinks() {
    this.linksActive = !this.linksActive;
  }

  /**
   * When the user clicks the logout button.
   */
  onLogout() {
    localStorage.removeItem('token');
    this.auth.currentUser.next(null);
    this.auth.token.next(null);
    location.reload();
  }
}
