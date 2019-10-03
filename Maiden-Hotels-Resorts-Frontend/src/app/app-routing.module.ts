
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ServicesComponent } from './services/services.component';
import { HotelsServicesComponent } from './hotels-services/hotels-services.component';
import { HotelsRoomsComponent } from './hotels-rooms/hotels-rooms.component';
import { GuestsComponent } from './guests/guests.component';
import {HomeComponent} from './home/home.component';
import {ClientsComponent} from './clients/clients.component'
import {LoginClientComponent} from './login-client/login-client.component'
import {BookingComponent} from './booking/booking.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch : 'full'},
    {path: 'home', component: HomeComponent },
    {path: 'login-client', component: LoginClientComponent },
    {path: 'booking', component: BookingComponent },
    //{path: 'hotels-view', component: HotelsViewComponent },
    //{path: 'hostels-view', component: HostelsViewComponent }, TODO ADD MORE....
    {path: 'manage-clients', component: ClientsComponent},
    {path: 'manage-guests', component: GuestsComponent },
    {path: 'manage-hotels', component: HotelsComponent },
    {path: 'manage-rooms', component: RoomsComponent },
    {path: 'manage-services', component: ServicesComponent },
    //{path: 'manage-hotels-services', component: HotelsServicesComponent },
    //{path: 'manage-hotels-rooms', component: HotelsRoomsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
