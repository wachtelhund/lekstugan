import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {
  ImageComponent,
  ImageModal,
} from './pages/image-gallery/image/image.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  ImageGalleryComponent,
} from './pages/image-gallery/image-gallery.component';
import {HttpClientModule} from '@angular/common/http';
import {
  EventsContainerComponent,
} from './pages/events-container/events-container.component';
import {EventComponent} from './pages/events-container/event/event.component';
import {MatCardModule} from '@angular/material/card';
import {
  BookingFormComponent,
} from './components/booking-form/booking-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
  PostButtonComponent,
} from './components/UI/post-button/post-button.component';
import {EventFormComponent} from './components/event-form/event-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ImageGalleryComponent,
    ImageComponent,
    ImageModal,
    EventsContainerComponent,
    EventComponent,
    BookingFormComponent,
    PostButtonComponent,
    EventFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
/**
 * AppModule
 */
export class AppModule { }
