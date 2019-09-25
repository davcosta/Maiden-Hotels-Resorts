import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ConstantsService } from './common/services/constants.service';
import { ServicesComponent } from './services/services.component';
import { HotelsServicesComponent } from './hotels-services/hotels-services.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HotelsRoomsComponent } from './hotels-rooms/hotels-rooms.component';
import { GuestsComponent } from './guests/guests.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsComponent } from './clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    ServicesComponent,
    HotelsServicesComponent,
    RoomsComponent,
    HotelsRoomsComponent,
    GuestsComponent,
    HomeComponent,
    FooterComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ConstantsService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
