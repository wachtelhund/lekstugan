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
import {AdminComponent} from './pages/admin/admin.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './services/auth.guard';
import {
  AdminAuthenticatorComponent,
} from './components/admin-authenticator/admin-authenticator.component';

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
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth',
    component: AdminAuthenticatorComponent,
    canActivate: [AuthGuard],
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
