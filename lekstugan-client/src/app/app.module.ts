import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {
  ImageComponent,
  ImageModal,
} from './image-gallery/image/image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsContainerComponent } from './events-container/events-container.component';
import { EventComponent } from './events-container/event/event.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    ImageGalleryComponent,
    ImageComponent,
    ImageModal,
    EventsContainerComponent,
    EventComponent,
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

  ],
  providers: [],
  bootstrap: [AppComponent],
})
/**
 * AppModule
 */
export class AppModule { }
