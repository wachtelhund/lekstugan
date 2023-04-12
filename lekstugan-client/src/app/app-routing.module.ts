import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  ImageGalleryComponent,
} from './pages/image-gallery/image-gallery.component';
import {
  EventsContainerComponent,
} from './pages/events-container/events-container.component';
import {
  BookingFormComponent,
} from './components/booking-form/booking-form.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: ImageGalleryComponent,
  },
  {
    path: 'events',
    component: EventsContainerComponent,
  },
  {
    path: 'contact',
    component: BookingFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * AppRoutingModule
 */
export class AppRoutingModule { }
