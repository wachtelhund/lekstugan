import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSticky: boolean = false;
  title = 'lekstugan-client';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    this.isSticky = scrollTop > 50;
  }
}
