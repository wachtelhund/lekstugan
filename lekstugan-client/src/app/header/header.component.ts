import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
    shouldRun = false;
    mobile = false;

    onToggleSidenav() {
      this.shouldRun = !this.shouldRun;
    }

    ngOnInit() {
      if (window.screen.width < 768) {
        this.mobile = true;
      }
    }
}
