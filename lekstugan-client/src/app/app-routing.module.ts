import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ImageGalleryComponent} from './image-gallery/image-gallery.component';
import {EventsContainerComponent} from './events-container/events-container.component';
import {BookingFormComponent} from './booking-form/booking-form.component';

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
export class AppRoutingModule { }
